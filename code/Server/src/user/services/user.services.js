import DbConnection from "../../config/dbconnection.js";

class UserServices {
  static async getUsers() {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request().query('SELECT * FROM Users');
    await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
    return result.recordset;
  }

  static async getUserById(id) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('id', id)
      .query('SELECT * FROM Users WHERE id = @id');
    await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
    return result.recordset;
  }

  static async createUser(user) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('name', user.name)
      .input('email', user.email)
      // Add more inputs as needed
      .query('INSERT INTO Users (name, email) VALUES (@name, @email)');
    await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
    return result.recordset;
  }

  static async updateUserById(id, user) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('id', id)
      .input('name', user.name)
      .input('email', user.email)
      // Add more inputs as needed
      .query('UPDATE Users SET name = @name, email = @email WHERE id = @id');
    await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
    return result.recordset;
  }

  static async deleteUserById(id) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('id', id)
      .query('DELETE FROM Users WHERE id = @id');
    await DbConnection.getInstance().closeConnection(); // Cierra la conexión aquí
    return result.recordset;
  }
  
}

export default UserServices;
