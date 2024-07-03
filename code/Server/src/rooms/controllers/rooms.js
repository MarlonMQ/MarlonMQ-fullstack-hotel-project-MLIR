import { deleteImageFromBucket } from "../../utils/bucketManager.js";
import RoomsServices from "../services/rooms.js";
import path from 'path';
import { fileURLToPath } from 'url';

class RoomsController {

    static async getDataRooms(req, res) {
        try {
            const result = await RoomsServices.getDataRooms();
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async getDataRoom(req, res) {
        const id  = req.params.id;

        try {
            const result = await RoomsServices.getDataRoom(id);

            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async getMaxRoomNumber(req, res) {
        const id  = req.params.id;
        try {
            const roomsDates = await RoomsServices.getMaxRoomNumber(id);
            res.status(200).send(roomsDates);

        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async getConsultDateRoom(req, res) {
        const id  = req.params.id;
        const room_number = req.params.room_number;
        try {
            const roomsDates = await RoomsServices.getConsultDateRoom(id, room_number);

            res.status(200).send(roomsDates);

        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async uploadRoom(req, res) {
        
        try {
            const {id, type, price, availables, capacity, description } = req.body;
            

            const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

            await RoomsServices.uploadRoom(id, type, price, availables, capacity, description, imageUrl);
            
            res.status(201).send({
                message: 'Room uploaded successfully'
            });

        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    
    static async updateRoom(req, res) {

        console.log("Actualizado: ", req.body);
        
        const imageUrl = req.query.url;
        console.log("Delete imgUrl: ", imageUrl);
        // URL actual hasta el .js
        const __filename = fileURLToPath(import.meta.url);
        console.log("Delete filename: ", __filename);

        // directorio padre de este .js
        const __dirname = path.dirname(__filename);
        console.log("Delete: ", __dirname);

        const baseDir = path.join(__dirname, '../../');
        console.log("Base dir: ", __dirname);
        deleteImageFromBucket(imageUrl, baseDir);

        try {
            const { type, price, availables, capacity, description, id } = req.body;
            
            // tengo que borrar la anterior imagen
            const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

            await RoomsServices.updateRoom(type, price, availables, capacity, description, id, imageUrl);
            
            res.status(201).send({
                message: 'Room uploaded successfully'
            });

        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    static async deleteRoom(req, res) {

        const imageUrl = req.query.url;
        console.log("Delete imgUrl: ", imageUrl);
        // URL actual hasta el .js
        const __filename = fileURLToPath(import.meta.url);
        console.log("Delete filename: ", __filename);

        // directorio padre de este .js
        const __dirname = path.dirname(__filename);
        console.log("Delete: ", __dirname);

        const baseDir = path.join(__dirname, '../../');
        console.log("Base dir: ", __dirname);
        
        try {
            await RoomsServices.deleteRoom(imageUrl);
            // Eliminar la imagen del bucket de almacenamiento (pseudocódigo)
            deleteImageFromBucket(imageUrl, baseDir);

            res.status(204).send({
                message: 'Room deleted successfully'
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default RoomsController;