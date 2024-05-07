import { Router } from 'express';
import { ReservationsController } from '../controllers/ReservationsController.js';
import checkToken from '../../utils/checkToken.js';

class ReservationRoutes {
    constructor() {
        this.router = Router();
        this.setupRoutes();
    }


    setupRoutes() {
        // Ruta para cargar un servicio
        this.router.post('/',checkToken,  (req, res) => {
            ReservationsController.createReservation(req, res);

        });
        this.router.get('/',checkToken,  (req, res) => {
            ReservationsController.getReservations(req, res);
        });

        this.router.delete('/:id',checkToken,  (req, res) => {
            ReservationsController.deleteReservation(req, res);
        });

    }


        getRouter() {
        return this.router;

    }
}

export default new ReservationRoutes().getRouter();
