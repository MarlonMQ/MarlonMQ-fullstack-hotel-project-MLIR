import { Router } from 'express';
import multer from 'multer';
import { UploadServiceController } from '../controllers/UploadServiceController.js';

class ServiceRoutes {
    constructor() {
        this.router = Router();
        this.configureMulter();
        this.setupRoutes();
    }

    //configuracion multer para el bucket
    

    configureMulter() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, process.cwd()+"/src/uploads/");  // Asegúrate de que el directorio uploads existe en tu servidor
            },
            filename: (req, file, cb) => {
                const fileExtension = file.originalname.split('.').pop();
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExtension}`;
                console.log(uniqueSuffix);
                console.log(file);
                cb(null, uniqueSuffix);
            }
        });
        this.upload = multer({ storage: storage });

    }

    setupRoutes() {
        // Ruta para cargar un servicio
        this.router.post('/upload-service', this.upload.single('image'), (req, res) => {
            console.log("setupRoutes service routes.js");
            UploadServiceController.uploadService(req, res);
        });

        // Ruta para obtener todos los servicios
        this.router.get('/all', (req, res) => {
            UploadServiceController.listServices(req, res);
        });

        // Ruta para obtener un servicio específico por ID
        this.router.get('/:id', (req, res) => {
            UploadServiceController.getServiceById(req, res);
        });

        // Ruta para actualizar un servicio específico
        this.router.put('/:id', (req, res) => {
            UploadServiceController.updateService(req, res);
        });

        // Ruta para eliminar un servicio específico
        this.router.delete('/deleteService', (req, res) => {
            UploadServiceController.deleteService(req, res);
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new ServiceRoutes().getRouter();
