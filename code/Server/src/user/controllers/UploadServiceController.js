//uploadServiceController.js
import sql from 'mssql';
import DbConnection from '../../config/dbconnection.js';

export class UploadServiceController {
    // aqui se guarda la info en la base de datos
    static async uploadService(req, res) {
        let db = null;
        try {
            db = await DbConnection.getInstance().getConnection();
            const { title } = req.body;
            const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

            await db.request()
                .input('Title', sql.NVarChar(255), title)  
                .input('ImageUrl', sql.NVarChar(500), imageUrl)  
                .query('INSERT INTO Services (Title, ImageUrl) VALUES (@Title, @ImageUrl)');  

            res.json({ message: 'Servicio subido con éxito', title, imageUrl });
        } catch (error) {
            console.error('Error al guardar en la base de datos', error);
            res.status(500).send('Error al guardar la información del servicio');
    }
}
    static async listServices(req, res) {
        let db = null;
        console.log('estoy recargando los servicios');
        try {
            db = await DbConnection.getInstance().getConnection();
            const results = await db.query('SELECT ServiceId, title, imageUrl FROM services');
            res.json(results.recordset); 
        } catch (error) {
            console.error('Failed to fetch services:', error);
            res.status(500).send('Internal Server Error');
        } finally {
            if (db) {
                db.close();
            }
        }
}

}