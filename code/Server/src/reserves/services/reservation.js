import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql
import { v4 as uuidv4 } from 'uuid';


class ReservesServices {

    static async createReservation(email, lastName, checkIn, checkOut, stat, id_room, services, roomNumber) {
        const pool = await DbConnection.getInstance().getConnection();

        
        console.log("room number desde services", roomNumber);
        //! ocupo el id de room_number
        const getIdRoomNumber = await pool.request()
            .input('room_num', sql.Int, roomNumber)
            .input('id_room', sql.UniqueIdentifier, id_room)
            .query('SELECT id FROM room_number WHERE num_room = @room_num AND id_room_type = @id_room');

        console.log("id obtenido: ", getIdRoomNumber.recordset[0].id);
        const id_room_number = getIdRoomNumber.recordset[0].id;

        // Insert en room availability
        let id_room_availability = uuidv4();
        await pool.request()
            .input('id_room_availability', sql.UniqueIdentifier, id_room_availability)
            .input('id_room_number', sql.UniqueIdentifier, id_room_number)
            .input('arrival_date', sql.Date, checkIn)
            .input('departure_date', sql.Date, checkOut)
            .query(`
                INSERT INTO room_availability (id_room_availability, room_number, arrival_Date, departure_date)
                VALUES 
                (@id_room_availability, @id_room_number, @arrival_date, @departure_date)
            `)



        let id_reserve = uuidv4();
        const result = await pool.request()
            .input('id_reserve', sql.UniqueIdentifier, id_reserve)
            .input('Email', sql.VarChar(), email)
            .input('apellido', sql.VarChar(), lastName)
            .input('fecha_inico', sql.Date, checkIn)
            .input('fecha_fin', sql.Date, checkOut)
            .input('stat', sql.VarChar(), stat)
            .input('id_room', sql.UniqueIdentifier, id_room)
            .query('INSERT INTO reserve (id_reserve, email, last_name, arrival_date, departure_date, stat, id_room) VALUES (@id_reserve, @Email, @apellido, @fecha_inico, @fecha_fin, @stat, @id_room)');


        let id;
        if (services.length > 0) {

            for (let i = 0; i < services.length; i++) {
                id = uuidv4();
                await pool.request()
                    .input('id', sql.UniqueIdentifier, id)
                    .input('id_reserve', sql.UniqueIdentifier, id_reserve)
                    .input('id_service', sql.UniqueIdentifier, services[i].id_service)
                    .query(`
                        INSERT INTO reserveXservices (id, id_reserve, id_service) VALUES
                        (@id, @id_reserve, @id_service)
                    `);
            }
        } else {
            id = uuidv4();
            await pool.request()
            .input('id', sql.UniqueIdentifier, id)
            .input('id_reserve', sql.UniqueIdentifier, id_reserve)
            .input('id_service', sql.UniqueIdentifier, null)
            .query(`
                INSERT INTO reserveXservices (id, id_reserve, id_service) VALUES
                (@id, @id_reserve, @id_service)
            `);
        }

        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset;
    }

    static async getReservations() {
        const pool = await DbConnection.getInstance().getConnection();
        try {
            const result = await pool.request().query(`
                SELECT 
                    r.id_reserve, 
                    r.email, 
                    r.last_name, 
                    r.arrival_date, 
                    r.departure_date, 
                    r.stat, 
                    rm.room_type
                FROM reserve r
                JOIN room rm ON r.id_room = rm.id_room
            `);
            await DbConnection.getInstance().closeConnection();
            return result.recordset;
        } catch (error) {
            throw error; // Rethrow the error to be caught in the controller
        }
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
            SELECT 
                Res.id_reserve,
                Res.email,
                Res.arrival_date,
                Res.departure_date,
                Roo.room_type,
                Roo.image_url,
                Res.stat,
                Srv.title
            FROM reserve Res
            LEFT JOIN room Roo
                ON Res.id_room = Roo.id_room
            LEFT JOIN reserveXservices RxS
                ON Res.id_reserve = RxS.id_reserve
            LEFT JOIN service Srv
                ON RxS.id_service = Srv.id_service
            WHERE Res.email = @email
        `)

        // .query(`
            // SELECT id_reserve, email, arrival_date, departure_date, room_type, image_url, stat
            // FROM reserve Res
            // LEFT JOIN room Roo
            // ON Res.id_room = Roo.id_room
            // WHERE Res.email = @email
        // `);


        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        console.log("recordset my res: ", result.recordset);
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

    static async updateReservation(id, email, lastName, checkIn, checkOut) {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request()
            .input('id_reserve', sql.UniqueIdentifier, id)
            .input('Email', sql.VarChar(), email)
            .input('apellido', sql.VarChar(), lastName)
            .input('fecha_inico', sql.Date, checkIn)
            .input('fecha_fin', sql.Date, checkOut)
            .query('UPDATE reserve SET email = @Email, last_name = @apellido, arrival_date = @fecha_inico, departure_date = @fecha_fin WHERE id_reserve = @id_reserve');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result;
    }

    static async updateReservationStatus(id, status) {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request()
        .input('id_reserve', sql.UniqueIdentifier, id)
        .input('stat', sql.VarChar(), status)
        .query('UPDATE reserve SET stat = @stat WHERE id_reserve = @id_reserve');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result;
    }

    
    
}

export default ReservesServices;