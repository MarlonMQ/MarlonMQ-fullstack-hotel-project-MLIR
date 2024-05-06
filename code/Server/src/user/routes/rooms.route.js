import { Router } from "express";
import multer from 'multer';
import RoomsController from "../controllers/rooms.controller.js";
import upload from "../../multer.config.js";

class RoomsRoutes {

    constructor() {
        this.router = Router();
        this.getDataRoomsRoute();
        this.uploadRoomRoute();
        this.deleteRoom();
    }




    getDataRoomsRoute() {
        console.log("getDataRoomRoute() method called");
        this.router.get('/getDataRooms', (req, res) => {
            RoomsController.getDataRooms(req, res);
        });
    }

    uploadRoomRoute() {
        console.log("uploadRoomRoute() method called");
        this.router.post('/', upload.single('image'), (req, res) => {
            RoomsController.uploadRoom(req, res);
        });
    }

    deleteRoom() {
        console.log("deleteRoom() method called");
        this.router.delete('/', (req, res) => {
            RoomsController.deleteRoom(req, res);
        });
    }

    getRouter() {
        return this.router;
    }

}


// export default new ServiceRoutes().getRouter();
export default new RoomsRoutes().getRouter();






