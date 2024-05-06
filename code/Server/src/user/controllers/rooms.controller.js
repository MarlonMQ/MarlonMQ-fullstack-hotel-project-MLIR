import DbConnection from "../../config/dbconnection.js";
import { deleteImageFromBucket } from "../services/bucketManager.js";
import RoomsServices from "../services/rooms.services.js";
import sql from 'mssql';
import path from 'path';
import { fileURLToPath } from 'url';

class RoomsController {

    static async getDataRooms(req, res) {
        console.log("GET /data rooms");
        try {
            const quantity_available = await RoomsServices.getDataRooms();
            // console.log("Data obtenida:", quantity_available);
            res.json(quantity_available);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    static async uploadRoom(req, res) {
        console.log("---------upload room-----------");
        console.log(req.body);
        let db = null;
        try {
            db = await DbConnection.getInstance().getConnection();
            const { type, price, availables, capacity, description } = req.body;
            console.log("----Info received", type);
            console.log("----Info received", price);
            console.log("----Info received", availables);

            const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;
            console.log("image url: ", imageUrl);

            await db.request()
                .input('room_type', sql.VarChar(), type)
                .input('price_per_night', sql.Int(), price)
                .input('quantity_available', sql.Int(), availables)
                .input('capacity', sql.Int(), capacity)
                .input('description', sql.VarChar(), description)
                .input('Image_url', sql.VarChar(500), imageUrl)
                .query('INSERT INTO room (room_type, price_per_night, quantity_available, capacity, description, image_url) VALUES (@room_type, @price_per_night, @quantity_available, @capacity, @description, @Image_url)');

            res.json({ message: 'Room subido con éxito', type, price, availables, imageUrl });
        } catch (error) {
            console.log("Upload rooms fallo");
            console.error('Error al guardar en la base de datos', error);
            res.status(500).send('Error al guardar la información del room');
        }
    }
    
    static async deleteRoom(req, res) {
        const imageUrl = req.query.url;
        console.log("Image url req", imageUrl);
        // URL actual hasta el .js
        const __filename = fileURLToPath(import.meta.url);
        console.log("filename dir:", __filename);
        // directorio padre de este .js
        const __dirname = path.dirname(__filename);

        const baseDir = path.join(__dirname, '../../');
        console.log("test dir:", baseDir);
        let db = null;
        try {
            db = await DbConnection.getInstance().getConnection();
            // Eliminar el servicio de la base de datos
            await db.query(`DELETE FROM room WHERE image_url = '${imageUrl}'`);

            // Eliminar la imagen del bucket de almacenamiento (pseudocódigo)
            deleteImageFromBucket(imageUrl, baseDir);

            res.status(200).send('Service deleted successfully');
        } catch (error) {
            console.error('Error deleting service', error);
            res.status(500).send('Internal server error');
        } finally {
            if (db) {
                db.close();
            }
        }
    }
}

export default RoomsController;





