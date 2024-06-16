import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql
import CryptoJS from 'crypto-js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

class AccountsServices {
  
  static async signup(email, name, lastName, phone_number, birth_date, country, region, address, rol) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('name', sql.VarChar, name)
      .input('last_name', sql.VarChar, lastName)
      .input('phone_number', sql.VarChar, phone_number)
      .input('birth_date', sql.Date, new Date(birth_date))
      .input('country', sql.VarChar, country)
      .input('region', sql.VarChar, region)
      .input('address', sql.VarChar, address)
      .input('rol', sql.VarChar, rol)
      .query('INSERT INTO t_user(email, name, last_name, phone_number, birth_date, country, region, address, rol) VALUES (@email, @name, @last_name, @phone_number, @birth_date, @country, @region, @address, @rol)');
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

  static async sendSignupEmail(email, name, password) {
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
      
      Here are your login details:
      Email: ${email}
      Password: ${password}

      Best regards,
      Hazbin Hotel Team`
    };

    

    return transporter.sendMail(mailOptions);
  }

  static async generatePassword(length = 12) {
    return crypto.randomBytes(length).toString('base64').slice(0, length);
  }

  static async getAllAccounts() {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request().query(`
      SELECT email, name, last_name, phone_number, CONVERT(varchar, birth_date, 23) AS birth_date, address, region, country, rol 
      FROM t_user 
      WHERE rol != 'admin'
    `);
    await DbConnection.getInstance().closeConnection();
    return result.recordset;
  }

  static async updateUser(email, name, lastName, phone_number, birth_date, rol, country, region, address) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('name', sql.VarChar, name)
      .input('last_name', sql.VarChar, lastName)
      .input('phone_number', sql.VarChar, phone_number)
      .input('birth_date', sql.Date, new Date(birth_date))
      .input('rol', sql.VarChar, rol)
      .input('country', sql.VarChar, country)
      .input('region', sql.VarChar, region)
      .input('address', sql.VarChar, address)
      .query('UPDATE t_user SET name = @name, last_name = @last_name, phone_number = @phone_number, birth_date = @birth_date, rol = @rol, country = @country, region = @region, address = @address WHERE email = @email');
    await DbConnection.getInstance().closeConnection();
    return result.recordset;
  }

  static async deletePassword(email) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('DELETE FROM password WHERE email = @email');
    await DbConnection.getInstance().closeConnection();
    return result.rowsAffected > 0 ? undefined : 'User not found';
  }

  static async deleteAccount(email) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('DELETE FROM t_user WHERE email = @email');
      await DbConnection.getInstance().closeConnection();
      return result.rowsAffected > 0 ? undefined : 'User not found';
  }
}

export default AccountsServices;
