//uploadServiceController.js
import sql from 'mssql';
import DbConnection from '../../config/dbconnection.js';
import { deleteImageFromBucket } from '../../utils/bucketManager.js'; 
import ServiceServices from '../services/service.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();


export class UploadServiceController {
    // aqui se guarda la info en la base de datos
    static async uploadService(req, res) {

        try {
            const { title } = req.body;

            const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;
            
            const result = await ServiceServices.uploadService(title, imageUrl);
            res.status(201).json({ message: 'Service uploaded successfully', title, imageUrl });
        } catch (error) {
            console.error('Error al guardar en la base de datos', error);
            res.status(500).send('Error al guardar la información del servicio');
        }
    }

    
    static async listServices(req, res) {
        try {
            const result = await ServiceServices.listServices();
            res.json(result); 
        } catch (error) {
            console.error('Failed to fetch services:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async deleteService(req, res) {
        const imageUrl = req.query.url;
        // URL actual hasta el .js
        const __filename = fileURLToPath(import.meta.url);
        // directorio padre de este .js
        const __dirname = path.dirname(__filename);

        const baseDir = path.join(__dirname, '../../');

        try {
            const result = await ServiceServices.deleteService(imageUrl);

            // Eliminar la imagen del bucket de almacenamiento (pseudocódigo)
            deleteImageFromBucket(imageUrl, baseDir);

            res.status(200).send('Service deleted successfully');
        } catch (error) {
            console.error('Error deleting service', error);
            res.status(500).send('Internal server error');
        }
    }
}
  
