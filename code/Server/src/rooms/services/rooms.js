import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql
import { v4 as uuidv4 } from 'uuid';


class RoomsServices {

    static async getDataRooms() {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request().query('SELECT quantity_available, id_room, room_type, price_per_night, capacity, description, image_url FROM room');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset; // Record set devuelve un arreglo con un json por cada registro
    }
    static async getDataRoom(id) {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request()
        .input("id", sql.UniqueIdentifier, id)
        .query('SELECT quantity_available, id_room, room_type, price_per_night, capacity, description, image_url FROM room WHERE id_room = @id');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset; // Record set devuelve un arreglo con un json por cada registro
    }

    static async uploadRoom(id, type, price, availables, capacity, description, imageUrl) {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request()
            .input('id_room', sql.UniqueIdentifier, id) // Parámetro para el identificador único de la habitación
            .input('room_type', sql.VarChar(), type)
            .input('price_per_night', sql.Int(), price)
            .input('quantity_available', sql.Int(), availables)
            .input('capacity', sql.Int(), capacity)
            .input('description', sql.VarChar(), description)
            .input('Image_url', sql.VarChar(500), imageUrl)
            .query('INSERT INTO room (id_room, room_type, price_per_night, quantity_available, capacity, description, image_url) VALUES (@id_room, @room_type, @price_per_night, @quantity_available, @capacity, @description, @Image_url)');

            const status = "available";
            const id_room_type = id;
            const details = "Habitacion xxx, yyy";
            // Bucle para insertar filas en 'room_number'
            for (let num_room = 0; num_room < availables; num_room++) {
                let roomId = uuidv4();
                await pool.request()
                    .input('id', sql.UniqueIdentifier, roomId)
                    .input('num_room', sql.Int(), num_room)
                    .input('status', sql.VarChar(), status)
                    .input('id_room_type', sql.UniqueIdentifier, id_room_type)
                    .input('details', sql.VarChar(), details)
                    .query('INSERT INTO room_number (id, num_room, status, id_room_type, details) VALUES (@id, @num_room, @status, @id_room_type, @details)');
            }
        
            await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset;
    }
    
    
    static async updateRoom(type, price, availables, capacity, description, id, imageUrl) {
        const pool = await DbConnection.getInstance().getConnection();
        console.log("id en services: ", id);
        const result = await pool.request()
            .input('room_type', sql.VarChar(), type)
            .input('price_per_night', sql.Int(), price)
            .input('quantity_available', sql.Int(), availables)
            .input('capacity', sql.Int(), capacity)
            .input('description', sql.VarChar(), description)
            .input('id_room', sql.UniqueIdentifier, id)
            .input('Image_url', sql.VarChar(500), imageUrl)
            .query('UPDATE room SET room_type = @room_type, price_per_night = @price_per_night, quantity_available = @quantity_available, capacity = @capacity, description = @description, Image_url = @Image_url WHERE id_room = @id_room'
            );
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset;
    }

    static async deleteRoom(image_url) {
        console.log("img url desde delete room services: ", image_url);
        const pool = await DbConnection.getInstance().getConnection();
    
        
        await pool.request()
            .input('image_url', sql.VarChar(500), image_url)
            .query('DELETE FROM reserve WHERE id_room IN (SELECT id_room FROM room WHERE image_url = @image_url)');
    
        // Luego elimina la habitación
        const result = await pool.request()
            .input('image_url', sql.VarChar(500), image_url)
            .query('DELETE FROM room WHERE image_url = @image_url');
    
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset;
    }
    

}

export default RoomsServices;

