import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

class MyAccountServices {
  
  static async getEmail(token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.email;
  }

  static async getMyAccountData(email) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('email', email)
      .query('SELECT * FROM t_user WHERE email = @email');
    await DbConnection.getInstance().closeConnection();

    if (result.recordset.length === 0) {
      return null; 
    }
    return result.recordset[0];
  }

}

export default MyAccountServices;
