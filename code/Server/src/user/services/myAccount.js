import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

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

  static async updateMyAccount(email, name, lastName, phone_number, birth_date, country, region, address, profile_image) {
    if(!profile_image) {
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
        .query('UPDATE t_user SET name = @name, last_name = @last_name, phone_number = @phone_number, birth_date = @birth_date, country = @country, region = @region, address = @address, profile_image = NULL WHERE email = @email');
      await DbConnection.getInstance().closeConnection();
      return result.recordset;
    } else {
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
        .input('profile_image', sql.VarBinary(sql.MAX), Buffer.from(profile_image.data))
        .query('UPDATE t_user SET name = @name, last_name = @last_name, phone_number = @phone_number, birth_date = @birth_date, country = @country, region = @region, address = @address, profile_image = @profile_image WHERE email = @email');
      await DbConnection.getInstance().closeConnection();
      return result.recordset;
    }
  }

  static async changePassword(email, password, newPassword) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('email', email)
      .query('SELECT password FROM password WHERE email = @email');
  
    if (result.recordset.length === 0) {
      return null; // El usuario no existe
    }

    const encryptedPasswordFromDB = result.recordset[0].password;
    const decryptedPasswordFromBD = await MyAccountServices.decrypt(encryptedPasswordFromDB, process.env.SECRET_KEY);

    if (decryptedPasswordFromBD !== password) {
      return null;
    }

    const encryptedNewPassword = await MyAccountServices.encrypt(newPassword, process.env.SECRET_KEY);

    await pool.request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, encryptedNewPassword)
      .query('UPDATE password SET password = @password WHERE email = @email');
    await DbConnection.getInstance().closeConnection();
    return result.recordset;
  }

  static async decrypt(cipherText, key) {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, key);
      if (bytes.sigBytes > 0) {
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
      }
    } catch (error) {
        throw new Error('Drecript error');
    }
  }

  static async encrypt(password, key) {
    const cipherText = CryptoJS.AES.encrypt(password, key).toString();
    return cipherText;
  }

  static async deleteMyAccount(email, password) {
    try {
      const pool = await DbConnection.getInstance().getConnection();
      const transaction = new sql.Transaction(pool);
  
      // Iniciar la transacción
      await transaction.begin();
  
      try {
        // Verificar si el usuario existe y obtener el password_id
        const userResult = await pool.request()
          .input('email', sql.VarChar, email)
          .query('SELECT password FROM password WHERE email = @email');
  
        if (userResult.recordset.length === 0) {
          await transaction.rollback();
          await DbConnection.getInstance().closeConnection();
          return null; // El usuario no existe
        }
  
        // Eliminar primero la entrada de contraseña (referencia)
        await pool.request()
          .input('email', sql.VarChar, email)
          .query('DELETE FROM password WHERE email = @email');
  
        // Luego eliminar la cuenta de usuario
        await pool.request()
          .input('email', sql.VarChar, email)
          .query('DELETE FROM t_user WHERE email = @email');
  
        // Commit la transacción si todas las operaciones fueron exitosas
        await transaction.commit();
        await DbConnection.getInstance().closeConnection();
  
        return userResult.recordset; // Cuenta eliminada exitosamente
      } catch (error) {
        // Si ocurre un error, hacer rollback de la transacción
        await transaction.rollback();
        console.error('Error deleting account:', error.message);
        await DbConnection.getInstance().closeConnection();
        return null; // Manejar cualquier error de base de datos o conexión
      }
    } catch (error) {
      console.error('Error connecting to database:', error.message);
      return null; // Manejar cualquier error de conexión a la base de datos
    }
  }
  
}

export default MyAccountServices;
