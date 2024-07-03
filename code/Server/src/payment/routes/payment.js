import { Router } from 'express';
import paymentController from "../controllers/payment.js";
import checkToken from '../../utils/checkToken.js';

class PaymentRoutes {
    constructor() {
        this.router = Router();
        this.setupRoutes();
    }


    setupRoutes() {


        this.router.post('/', (req, res) => {
            paymentController.createPaymentIntent(req, res);
        });

        this.router.post('/add', (req, res) => {
            paymentController.addPayment(req, res);
        });

        this.router.get('/cards', (req, res) => {
            paymentController.getPayment(req, res);
        });

        this.router.get('/cardsUser/:userEmail', (req, res) => {
            paymentController.getCards(req, res);
        });



        this.router.post('/billing', (req, res) => {
            paymentController.createBilling(req, res);
        });

        this.router.get('/download/:reservationId', (req, res) => {
            paymentController.getInvoice(req, res);
        });


        this.router.get('/cardID/:cardId', (req, res) => {
            paymentController.getCardById(req, res);
        });

        this.router.delete('/deleteCard/:cardId', (req, res) => {
            paymentController.deleteCardById(req, res);
        });

        this.router.put('/editCard/:cardId', (req, res) => {
            paymentController.editCardById(req, res);
        });

    }


        getRouter() {
        return this.router;

    }
}

export default new PaymentRoutes().getRouter();
