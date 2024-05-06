import DbConnection from "../../config/dbconnection.js";


class RoomsServices {

    static async getDataRooms() {
        const pool = await DbConnection.getInstance().getConnection();
        const result = await pool.request().query('SELECT quantity_available, id_room, room_type, price_per_night, image_url FROM room');
        await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
        return result.recordset; // Record set devuelve un arreglo con un json por cada registro
    }



}

export default RoomsServices;