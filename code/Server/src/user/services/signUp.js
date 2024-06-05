import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql
import CryptoJS from 'crypto-js';
import nodemailer from 'nodemailer';

class SignupServices {
  
  static async signup(email, name, lastName, phone_number, birth_date, rol) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('name', sql.VarChar, name)
      .input('last_name', sql.VarChar, lastName)
      .input('phone_number', sql.VarChar, phone_number)
      .input('birth_date', sql.Date, new Date(birth_date))
      .input('rol', sql.VarChar, rol)
      .query('INSERT INTO t_user(email, name, last_name, phone_number, birth_date, rol) VALUES (@email, @name, @last_name, @phone_number, @birth_date, @rol)');
    await DbConnection.getInstance().closeConnection();
    return result.recordset;
  }

  static async signupPassword(email, password) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .query('INSERT INTO password(email, password) VALUES (@email, @password)');
    await DbConnection.getInstance().closeConnection();
    return result.recordset;
  }

  static async findUser(email) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM t_user WHERE email = @email');
    await DbConnection.getInstance().closeConnection();
    return result.recordset;
  }
  static async encrypt(password, key) {
    const cipherText = CryptoJS.AES.encrypt(password, key).toString();
    return cipherText;
  }

  static async sendSignupEmail(email, name) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Account Created Successfully',
      text: `Hello ${name}, your account has been created successfully!
      
      Best regards,
      Hazbin Hotel Team`
    };

    return transporter.sendMail(mailOptions);
  }
}

export default SignupServices;
