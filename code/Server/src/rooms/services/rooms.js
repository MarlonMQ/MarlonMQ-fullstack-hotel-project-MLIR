import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql


class RoomsServices {

    static async getDataRooms() {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request().query('SELECT quantity_available, id_room, room_type, price_per_night, capacity, description, image_url FROM room');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset; // Record set devuelve un arreglo con un json por cada registro
    }

    static async uploadRoom(type, price, availables, capacity, description, imageUrl) {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request()
            .input('room_type', sql.VarChar(), type)
            .input('price_per_night', sql.Int(), price)
            .input('quantity_available', sql.Int(), availables)
            .input('capacity', sql.Int(), capacity)
            .input('description', sql.VarChar(), description)
            .input('Image_url', sql.VarChar(500), imageUrl)
            .query('INSERT INTO room (room_type, price_per_night, quantity_available, capacity, description, image_url) VALUES (@room_type, @price_per_night, @quantity_available, @capacity, @description, @Image_url)');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset;
    }

    static async deleteRoom(imageUrl) { 
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request()
            .query(`DELETE FROM room WHERE image_url = '${imageUrl}'`);
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset;
    }

}

export default RoomsServices;