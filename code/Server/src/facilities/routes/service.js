import { Router } from 'express';

import { UploadServiceController } from '../controllers/uploadService.js';
import '../../app.js';
import upload from '../../multer.config.js';
import checkToken from '../../utils/checkToken.js';

class ServiceRoutes {
    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    //configuracion multer para el bucket
    



    setupRoutes() {
        // Ruta para cargar un servicio
        this.router.post('/', checkToken,upload.single('image'), (req, res) => {
            UploadServiceController.uploadService(req, res);
        });

        // Ruta para obtener todos los servicios
        this.router.get('/all', (req, res) => {
            UploadServiceController.listServices(req, res);
        });

        // Ruta para obtener un servicio específico por ID
        this.router.get('/:id',(req, res) => {
            UploadServiceController.getServiceById(req, res);
        });

        // Ruta para actualizar un servicio específico
        this.router.put('/:id', checkToken,upload.single('image'),  (req, res) => {
            UploadServiceController.updateService(req, res);
        });

        // Ruta para eliminar un servicio específico
        this.router.delete('/',checkToken,  (req, res) => {
            UploadServiceController.deleteService(req, res);
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new ServiceRoutes().getRouter();
