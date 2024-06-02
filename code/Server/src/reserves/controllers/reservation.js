import ReservesServices from '../services/reservation.js';
import dotenv from 'dotenv';

dotenv.config();

export class ReservationsController {


    // Metodo para ingresar una reserva
    static async createReservation(req, res) {
        const { email, lastName, checkIn, checkOut } = req.body; // Asegúrate de que estos datos se envíen desde el cliente

        try {
            await ReservesServices.createReservation(email, lastName, checkIn, checkOut);
            res.status(201).send({
                message: 'Reservation created successfully.'
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }


    // Método para obtener todas las reservas
    static async getReservations(req, res) {
        try {
            const result = await ReservesServices.getReservations();
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(error.message);
        }
    }

    static async getReservationById(req, res) {
        const { id } = req.body;
        try {
            const result = await ReservesServices.getReservationById(id);
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(error.message);
        }
    }


    // Método para actualizar una reserva existente
    static async deleteReservation(req, res) {
        const { id } = req.params; // Este es el email ahora, considera cambiar el nombre de la variable para evitar confusión
        try {
            const result = await ReservesServices.deleteReservation(id);
            if (result.rowsAffected[0] > 0) {
                res.status(204).send({
                    message: 'Reservation deleted successfully.'
                });
            } else {
                res.status(404).send({
                    message: 'Reservation not found.'
                });
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

}

