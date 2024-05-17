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
    }


    getDataRoomsRoute() {
        this.router.get('/getDataRooms', (req, res) => {
            RoomsController.getDataRooms(req, res);
        });
    }

    uploadRoomRoute() {
        this.router.post('/', checkToken,upload.single('image'), (req, res) => {
            RoomsController.uploadRoom(req, res);
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






