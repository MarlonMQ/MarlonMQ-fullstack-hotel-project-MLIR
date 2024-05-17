import sql from 'mssql';
import DbConnection from '../../config/dbconnection.js';
import ReservesServices from '../services/reservation.js';
import dotenv from 'dotenv';

dotenv.config();

export class ReservationsController {


    // Metodo para ingresar una reserva
    static async createReservation(req, res) {
        const { email, lastName, checkIn, checkOut } = req.body; // Asegúrate de que estos datos se envíen desde el cliente

        try {
            await ReservesServices.createReservation(email, lastName, checkIn, checkOut);
            res.json({ message: 'Reserva creada con éxito.' });
        } catch (error) {
            console.error('Error al guardar la reserva:', error);
            res.status(500).send('Error al guardar la información de la reserva');
        }
    }


    // Método para obtener todas las reservas
    static async getReservations(req, res) {
        try {
            const result = await ReservesServices.getReservations();
            res.status(200);
            res.json(result); // Devuelve un array de objetos JSON con las reservas
        } catch (err) {
            res.status(500).send('Error al obtener las reservas: ' + err.message);
        }
    }

    static async getReservationById(req, res) {
        const { id } = req.body;
        try {
            const result = await ReservesServices.getReservationById(id);
            res.status(200);
            res.json(result); // Devuelve un objeto JSON con la reserva correspondiente
        } catch (err) {
            res.status(500).send('Error al obtener la reserva: ' + err.message);
        }
    }


    // Método para actualizar una reserva existente
    static async deleteReservation(req, res) {
        const { id } = req.params; // Este es el email ahora, considera cambiar el nombre de la variable para evitar confusión
        
    
        try {
            const result = await ReservesServices.deleteReservation(id);
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

