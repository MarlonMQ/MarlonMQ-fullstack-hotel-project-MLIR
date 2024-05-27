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
            res.status(201).send({
                message: 'Service uploaded successfully',
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    
    static async listServices(req, res) {
        try {
            const result = await ServiceServices.listServices();
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send(error.message);
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

            res.status(204).send({
                message: 'Service deleted successfully',
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
  
