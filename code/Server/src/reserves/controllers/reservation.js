import ReservesServices from '../services/reservation.js';
import dotenv from 'dotenv';

dotenv.config();

export class ReservationsController {


    // Metodo para ingresar una reserva
    static async createReservation(req, res) {
        const { email, lastName, checkIn, checkOut, status, id_room, services, roomNumber  } = req.body;
        console.log("Create reservation controller: ", roomNumber);
        try {
            await ReservesServices.createReservation(email, lastName, checkIn, checkOut, status, id_room, services, roomNumber);
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
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async getReservationById(req, res) {
        const { id } = req.body;
        try {
            const result = await ReservesServices.getReservationById(id);
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async getReservationByEmail(req, res) {
        const email = req.params.email;
        console.log("email en by email: ", email);
        try {
            const result = await ReservesServices.getReservationByEmail(email);
            res.status(200).send(result);
        } catch (error) {
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

    static async updateReservation(req, res) {
        const { id } = req.params;
        const { email, lastName, checkIn, checkOut } = req.body;
        try {
            await ReservesServices.updateReservation(id, email, lastName, checkIn, checkOut);
            res.status(204).send({
                message: 'Reservation updated successfully.'
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async updateReservationStatus(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        try {
          const result = await ReservesServices.updateReservationStatus(id, status);
          if (result.rowsAffected[0] > 0) {
            res.status(200).send({
              message: 'Reservation status updated successfully.'
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

