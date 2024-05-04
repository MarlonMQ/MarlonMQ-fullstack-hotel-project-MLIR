import { Router } from "express";
import RoomsController from "../controllers/rooms.controller.js";


class RoomsRoutes {

    constructor() {
        this.router = Router();
        this.getQuantityAvailableRoute();
    }

    getQuantityAvailableRoute() {
        console.log("getQuantityAvailableRoute() method called");
        this.router.get('/getQuantityAvailable', (req, res) => {
            RoomsController.getQuantityAvailable(req, res);
        });
    }


    getRouter() {
        return this.router;
    }

}


// export default new ServiceRoutes().getRouter();
export default new RoomsRoutes().getRouter();






