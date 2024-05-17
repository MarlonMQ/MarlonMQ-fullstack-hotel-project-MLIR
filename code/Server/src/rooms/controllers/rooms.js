import DbConnection from "../../config/dbconnection.js";
import { deleteImageFromBucket } from "../../utils/bucketManager.js";
import RoomsServices from "../services/rooms.js";
import sql from 'mssql';
import path from 'path';
import { fileURLToPath } from 'url';

class RoomsController {

    static async getDataRooms(req, res) {
        try {
            const quantity_available = await RoomsServices.getDataRooms();
            res.status(200);
            res.json(quantity_available);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    static async uploadRoom(req, res) {
        
        try {
            const { type, price, availables, capacity, description } = req.body;
            

            const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

            await RoomsServices.uploadRoom(type, price, availables, capacity, description, imageUrl);
            
            res.status(200);
            res.send('Room uploaded successfully');

        } catch (error) {
            console.error('Error al guardar en la base de datos', error);
            res.status(500);
            res.send('Error al guardar la información del room');
        }
    }
    
    static async deleteRoom(req, res) {
        const imageUrl = req.query.url;
        // URL actual hasta el .js
        const __filename = fileURLToPath(import.meta.url);

        // directorio padre de este .js
        const __dirname = path.dirname(__filename);

        const baseDir = path.join(__dirname, '../../');

        
        try {
            await RoomsServices.deleteRoom(imageUrl);
            // Eliminar la imagen del bucket de almacenamiento (pseudocódigo)
            deleteImageFromBucket(imageUrl, baseDir);

            res.status(200).send('Service deleted successfully');
        } catch (error) {
            console.error('Error deleting service', error);
            res.status(500).send('Internal server error');
        }
    }
}

export default RoomsController;





