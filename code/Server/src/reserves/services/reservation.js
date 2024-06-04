import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql
import { v4 as uuidv4 } from 'uuid';


class ReservesServices {

    static async createReservation(email, lastName, checkIn, checkOut, stat) {
        const pool = await DbConnection.getInstance().getConnection();
        let id_reserve = uuidv4();
        const result = await pool.request()
            .input('id_reserve', sql.UniqueIdentifier, id_reserve)
            .input('Email', sql.VarChar(), email)
            .input('apellido', sql.VarChar(), lastName)
            .input('fecha_inico', sql.Date, checkIn)
            .input('fecha_fin', sql.Date, checkOut)
            .input('stat', sql.VarChar(), stat)
            .query('INSERT INTO reserve (id_reserve, email, last_name, arrival_date, departure_date, stat) VALUES (@id_reserve, @Email, @apellido, @fecha_inico, @fecha_fin, @stat)');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset;
    }

    static async getReservations() {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request().query('SELECT id_reserve, email, last_name, arrival_date, departure_date, stat FROM reserve');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset;
    }

    static async getReservationById(id) {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request().query(`SELECT id_reserve, email, last_name, arrival_date, departure_date FROM reserve WHERE id_reserve = ${id}`);
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset[0];
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
            console.log("Estado que llega al backend", id, status);
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