import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql
import { v4 as uuidv4 } from 'uuid';


class ReservesServices {

    static async createReservation(id_room, email, lastName, checkIn, checkOut) {
        console.log("Desde reservation service: " , id_room, email, checkIn, checkOut);
        const pool = await DbConnection.getInstance().getConnection();

        let id_reserve = uuidv4();
        const result = await pool.request()
            .input('id_reserve', sql.UniqueIdentifier, id_reserve)
            .input('id_room', sql.UniqueIdentifier, id_room)
            .input('Email', sql.VarChar(), email)
            .input('apellido', sql.VarChar(), lastName)
            .input('fecha_inico', sql.Date, checkIn)
            .input('fecha_fin', sql.Date, checkOut)
            .query('INSERT INTO reserve (id_reserve, email, last_name, arrival_date, departure_date, id_room) VALUES (@id_reserve, @Email, @apellido, @fecha_inico, @fecha_fin, @id_room)');


        // No es necesario dar el numero de habitacion, ni actualizar el estatus a unavailable
        // tampoco reducir el quantity available si aun no he pagado.
        
        // await pool.request()
        // .input('id_room', sql.UniqueIdentifier, id_room)
        // .query('UPDATE room SET quantity_available = quantity_available - 1 WHERE id_room = @id_room;')
        
        // // buscar la primera que este available, hacerla unavailable pq la reserve
        // const roomsType = await pool.request()
        // .query('SELECT * FROM room_number ORDER BY num_room;')
        // console.log("----HABITACIONES DE: ", id_room, roomsType.recordset);
        // for (let room = 0; room < roomsType.recordset.length; room++) {
            
        //     if (roomsType.recordset[room].status == 'available') {
        //         const status = roomsType.recordset[room].status;
        //         console.log("room ", id, "available");
        //         await pool.request()
        //         .input('status', sql.VarChar(), status)
        //         .query(`
        //             UPDATE room_number 
        //             SET status = 'unavailable'
        //             WHERE status = @status
        //         `
        //         )
        //         break;
        //     }
            
        // }

        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset;
    }

    static async getReservations() {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request().query('SELECT id_reserve, email, last_name, arrival_date, departure_date FROM reserve');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset;
    }

    static async getReservationById(id) {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request().query(`SELECT id_reserve, email, last_name, arrival_date, departure_date FROM reserve WHERE id_reserve = ${id}`);
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset[0];
    }
    static async getReservationByEmail(email) {
        console.log("email en reserves services ", "-", email.trim(), "-");
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request()
        .input("email", sql.VarChar, email)
        .query(`
            SELECT id_reserve, email, arrival_date, departure_date, room_type, image_url
            FROM reserve Res
            LEFT JOIN room Roo
            ON Res.id_room = Roo.id_room
            WHERE Res.email = @email`
        );
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        console.log("recordset: ", result.recordset);
        return result.recordset;
    }
    static async deleteReservation(id) {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request()
            .input('id_reserva', sql.VarChar, id)
            .query('DELETE FROM reserve WHERE id_reserve = @id_reserva');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result;
    }

    
    
}

export default ReservesServices;