import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql
import { v4 as uuidv4 } from 'uuid';


class ServiceServices {

    static async uploadService(title, price, imageUrl) {
        const pool = await DbConnection.getInstance().getConnection();
        let id_service = uuidv4();
        const result = await pool.request()
            .input('id_service', sql.UniqueIdentifier, id_service)
            .input('title', sql.NVarChar(255), title)
            .input('price', sql.Int, price)
            .input('imageUrl', sql.NVarChar(500), imageUrl)
            .query('INSERT INTO service (id_service, title, imageUrl, price) VALUES (@id_service, @title, @imageUrl, @price)');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result;
    }

    static async listServices() {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.query('SELECT id_service, title, imageUrl, price FROM service');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset;
    }

    static async deleteService(imageUrl) {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request()
            .input('imageUrl', sql.NVarChar(500), imageUrl)
            .query('DELETE FROM service WHERE imageUrl = @imageUrl');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result;
    }

    static async updateService(id, title, imageUrl, price) {
        console.log("datos", id, title, imageUrl);
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request()
            .input('id_service', sql.UniqueIdentifier, id)
            .input('title', sql.NVarChar(255), title)
            .input('imageUrl', sql.NVarChar(500), imageUrl)
            .input('price', sql.Int, price)
            .query('UPDATE service SET title = @title, imageUrl = @imageUrl, price = @price WHERE id_service = @id_service');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result;
    }


}

export default ServiceServices;