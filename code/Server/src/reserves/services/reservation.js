import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql
import { v4 as uuidv4 } from 'uuid';


class ReservesServices {

    static async createReservation(email, lastName, checkIn, checkOut, stat, id_room, services, roomNumber, totalAmount) {
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
            .input('totalAmount', sql.Int, totalAmount)
            .input('num_room', sql.Int, roomNumber)
            .query('INSERT INTO reserve (id_reserve, email, last_name, arrival_date, departure_date, stat, id_room, total, num_room) VALUES (@id_reserve, @Email, @apellido, @fecha_inico, @fecha_fin, @stat, @id_room, @totalAmount, @num_room)');

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
                Res.total,
                Res.num_room,
                Res.id_room,
                Roo.room_type,
                Roo.image_url,
                Roo.price_per_night,
                Res.stat,
                Srv.title,
                Srv.id_service,
                RA.id_room_availability
            FROM reserve Res
            LEFT JOIN room Roo
                ON Res.id_room = Roo.id_room
            LEFT JOIN reserveXservices RxS
                ON Res.id_reserve = RxS.id_reserve
            LEFT JOIN service Srv
                ON RxS.id_service = Srv.id_service
            LEFT JOIN room_availability RA
                ON RA.room_number = (
                    SELECT RN.id
                    FROM room_number RN
                    WHERE RN.num_room = Res.num_room AND RN.id_room_type = Res.id_room
                    AND RA.arrival_date = Res.arrival_date
                    AND RA.departure_date = Res.departure_date
                )
            WHERE Res.email = @email
        `)
        // .query(`
        //     SELECT 
        //         Res.id_reserve,
        //         Res.email,
        //         Res.arrival_date,
        //         Res.departure_date,
        //         Res.total,
        //         Res.num_room,
        //         Roo.room_type,
        //         Roo.image_url,
        //         Res.stat,
        //         Srv.title,
        //         RA.id_room_availability
        //     FROM reserve Res
        //     LEFT JOIN room Roo
        //         ON Res.id_room = Roo.id_room
        //     LEFT JOIN reserveXservices RxS
        //         ON Res.id_reserve = RxS.id_reserve
        //     LEFT JOIN service Srv
        //         ON RxS.id_service = Srv.id_service
        //     LEFT JOIN room_availability RA
        //         ON RA.room_number = (
        //             SELECT RN.id
        //             FROM room_number RN
        //             WHERE RN.num_room = Res.num_room AND RN.id_room_type = Res.id_room
        //             AND RA.arrival_date = Res.arrival_date
        //             AND RA.departure_date = Res.departure_date
        //         )
        //     WHERE Res.email = @email
        // `)
        // .query(`
        //     SELECT 
        //         Res.id_reserve,
        //         Res.email,
        //         Res.arrival_date,
        //         Res.departure_date,
        //         Res.total,
        //         Res.num_room,
        //         Roo.room_type,
        //         Roo.image_url,
        //         Res.stat,
        //         Srv.title
        //     FROM reserve Res
        //     LEFT JOIN room Roo
        //         ON Res.id_room = Roo.id_room
        //     LEFT JOIN reserveXservices RxS
        //         ON Res.id_reserve = RxS.id_reserve
        //     LEFT JOIN service Srv
        //         ON RxS.id_service = Srv.id_service
        //     WHERE Res.email = @email
        // `)

        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        // console.log("recordset my res: ", result.recordset);
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
    //!
    static async deleteReserve(id_reserve, id_room_availability) {
        console.log("new delete reserve 3", id_reserve);
        console.log("new delete reserve 3", id_room_availability);
        const pool = await DbConnection.getInstance().getConnection();

        await pool.request()
        .input('id_res', sql.UniqueIdentifier, id_reserve)
        .query(`
            DELETE FROM reserveXservices WHERE id_reserve = @id_res;
        `);


        await pool.request()
        .input('id_room_av', sql.UniqueIdentifier, id_room_availability)
        .query(`
            DELETE FROM room_availability WHERE id_room_availability = @id_room_av;
        `);

        const result = await pool.request()
        .input('id_res', sql.UniqueIdentifier, id_reserve)
        .query(`
            DELETE FROM reserve WHERE id_reserve = @id_res;
        `);

        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí

        return result;
    }

    static async updateReserveById(reserveId, avId, checkIn, checkOut, status, services, roomNumber, totalAmount, id_service) {
        //! Pasos (ocupo el id service)
        // 1. Borrar las reservas con el reserveId de resXServ
        // 2. Insertar los nuevos services reusando el reserveId
        // 3. Actualizar la data nueva en reserve: checkIn, checkOut, totalAmount (no permitir que cambie el numero de hab)
        // 4. Actualizar la data en room available: in y out
        const pool = await DbConnection.getInstance().getConnection();
        
        //! 1
        await pool.request()
        .input('reserveId', sql.UniqueIdentifier, reserveId)
        .query(`
            DELETE FROM reserveXservices
            WHERE id_reserve = @reserveId
        `)
        
        //! 2
        
        for (let i = 0; i < services.length; i++) {
            console.log("Services: ", services[i]);
            const newRxSId = uuidv4();
            id_service[i] = services[i].id_service;
            console.log("Services ids: ", id_service[i]);
            await pool.request()
            .input('id_service', sql.UniqueIdentifier, id_service[i])
            .input('id', sql.UniqueIdentifier, newRxSId)
            .input('reserveId', sql.UniqueIdentifier, reserveId)
            .query(`
                INSERT INTO reserveXservices (id, id_reserve, id_service) VALUES
                (@id, @reserveId, @id_service)
            `)
        }

        //! 3
        await pool.request()
        .input('reserveId', sql.UniqueIdentifier, reserveId)
        .input('In', sql.Date, checkIn)
        .input('Out', sql.Date, checkOut)
        .input('totalAmount', sql.Int, totalAmount)
        .query(`
            UPDATE reserve
            SET arrival_date = @In,
                departure_date = @Out,
                total = @totalAmount
            WHERE id_reserve = @reserveId
        `)
        console.log("Id en availab", avId);
        const result = await pool.request()
        .input('id_av', sql.UniqueIdentifier, avId)
        .input('In', sql.Date, checkIn)
        .input('Out', sql.Date, checkOut)
        .query(`
            UPDATE room_availability
            SET arrival_Date = @In,
                departure_date = @Out
            WHERE id_room_availability = @id_av
        `)  

        await DbConnection.getInstance().closeConnection();
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