import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql


class ServiceServices {

    static async uploadService(title, imageUrl) {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request()
            .input('title', sql.NVarChar(255), title)
            .input('imageUrl', sql.NVarChar(500), imageUrl)
            .query('INSERT INTO service (title, imageUrl) VALUES (@title, @imageUrl)');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result;
    }

    static async listServices() {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.query('SELECT id_service, title, imageUrl FROM service');
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


}

export default ServiceServices;