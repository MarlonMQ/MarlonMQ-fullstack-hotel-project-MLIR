import sql from 'mssql';
import DbConnection from '../../config/dbconnection.js';
import dotenv from 'dotenv';

dotenv.config();

export class ReservationsController {


    // Metodo para ingresar una reserva
    static async createReservation(req, res) {

        let db = null;
        const { email, lastName, checkIn, checkOut } = req.body; // Asegúrate de que estos datos se envíen desde el cliente

        try {
            db = await DbConnection.getInstance().getConnection();
            await db.request()
            .input('Email', sql.VarChar, email)
            .input('apellido', sql.VarChar, lastName)  // Make sure 'lastName' matches 'Apellido' in your SQL query
            .input('fecha_inico', sql.Date, checkIn)
            .input('fecha_fin', sql.Date, checkOut)
            .query('INSERT INTO reserve (email, last_name, arrival_date, departure_date) VALUES (@Email, @apellido, @fecha_inico, @fecha_fin)');

            res.json({ message: 'Reserva creada con éxito.' });
        } catch (error) {
            console.error('Error al guardar la reserva:', error);
            res.status(500).send('Error al guardar la información de la reserva');
        }
    
}


    // Método para obtener todas las reservas
// Método para obtener todas las reservas
static async getReservations(req, res) {
    let db = null;
    try {
        db = await DbConnection.getInstance().getConnection();
        const results = await db.query('SELECT id_reserve, email, last_name, arrival_date, departure_date FROM reserve');
        res.json(results.recordset); // Devuelve un array de objetos JSON con las reservas
    } catch (err) {
        res.status(500).send('Error al obtener las reservas: ' + err.message);
    }
}

    static async getReservationById(req, res) {
        let db = null;
        const { id } = req.body;
        try {
            db = await DbConnection.getInstance().getConnection();
            const results = await db.query(`SELECT id_reserve, email, last_name, arrival_date, departure_date FROM reserve WHERE id_reserve = ${id}`);
            res.json(results.recordset[0]); // Devuelve un objeto JSON con la reserva correspondiente
        } catch (err) {
            res.status(500).send('Error al obtener la reserva: ' + err.message);
        }
    }


    // Método para actualizar una reserva existente
    static async deleteReservation(req, res) {
        const { id } = req.params; // Este es el email ahora, considera cambiar el nombre de la variable para evitar confusión
        let db = null;
    
        try {
            db = await DbConnection.getInstance().getConnection();
            const result = await db.request()
                .input('id_reserva', sql.VarChar, id) // Cambiar a tipo adecuado si id es el correo
                .query('DELETE FROM reserve WHERE id_reserve = @id_reserva');
    
            if (result.rowsAffected[0] > 0) {
                res.json({ message: 'Reserva eliminada con éxito.' });
            } else {
                res.status(404).send('Reserva no encontrada.');
            }
        } catch (error) {
            console.error('Error al eliminar la reserva:', error);
            res.status(500).send('Error al eliminar la reserva');
        }
    }
    


}

