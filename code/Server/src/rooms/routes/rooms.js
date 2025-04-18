import { Router } from "express";
import RoomsController from "../controllers/rooms.js";
import upload from "../../multer.config.js";
import checkToken from '../../utils/checkToken.js';

class RoomsRoutes {

    constructor() {
        this.router = Router();
        this.getDataRoomsRoute();
        this.uploadRoomRoute();
        this.deleteRoom();
        this.updateRoomRoute();
        this.getDataRoomRoute();
        this.getConsultDateRoomRoute();
        this.getMaxRoomNumberRoute();
    }


    getDataRoomsRoute() {
        this.router.get('/', (req, res) => {
            RoomsController.getDataRooms(req, res);
        });
    }

    getMaxRoomNumberRoute() {
        this.router.get('/consultDate/:id', (req, res) => {
            RoomsController.getMaxRoomNumber(req, res);
        });
    }

    getConsultDateRoomRoute() {
        this.router.get('/consultDate/:id/:room_number', (req, res) => {
            RoomsController.getConsultDateRoom(req, res);
        });
    }
    getDataRoomRoute() {
        console.log("En routes");
        this.router.get('/moreInfo/:id', (req, res) => {
            RoomsController.getDataRoom(req, res);
        });
    }

    uploadRoomRoute() {
        this.router.post('/', checkToken, upload.single('image'), (req, res) => {
            RoomsController.uploadRoom(req, res);
        });
    }

    updateRoomRoute() {
        this.router.patch('/', checkToken, upload.single('image'), (req, res) => {
            RoomsController.updateRoom(req, res);
        });
    }

    deleteRoom() {
        this.router.delete('/', checkToken,(req, res) => {
            RoomsController.deleteRoom(req, res);
        });
    }

    getRouter() {
        return this.router;
    }

}


// export default new ServiceRoutes().getRouter();
export default new RoomsRoutes().getRouter();