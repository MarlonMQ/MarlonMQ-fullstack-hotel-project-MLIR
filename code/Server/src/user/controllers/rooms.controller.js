import RoomsServices from "../services/rooms.services.js";


class RoomsController {

    static async getQuantityAvailable(req, res) {
        console.log("GET /rooms quantity available");
        try {
            const quantity_available = await RoomsServices.getQuantityAvailable();
            console.log("Data obtenida:", quantity_available);
            res.json(quantity_available);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

}

export default RoomsController;





