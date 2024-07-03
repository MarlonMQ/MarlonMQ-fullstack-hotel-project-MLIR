import { Router } from 'express';
import { ReservationsController } from '../controllers/reservation.js';
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
        this.router.get('/myreservations/:email', checkToken,  (req, res) => {
            ReservationsController.getReservationByEmail(req, res);
        });

        this.router.delete('/:id',checkToken,  (req, res) => {
            ReservationsController.deleteReservation(req, res);
        });
        //! actuales
        this.router.put("/updateReservation", checkToken, (req, res) => {
            ReservationsController.updateReserveById(req, res);
        });
        this.router.delete('/deleteRes/:id_res/:id_av', checkToken,  (req, res) => {
            console.log("new delete reserve called 1");

            ReservationsController.deleteReserve(req, res);
        });

        this.router.put('/:id',checkToken,  (req, res) => {
            ReservationsController.updateReservation(req, res);
        });
        this.router.put('/:id/changestatus',checkToken,  (req, res) => {
            ReservationsController.updateReservationStatus(req, res);
        });




    }


        getRouter() {
        return this.router;

    }
}

export default new ReservationRoutes().getRouter();
