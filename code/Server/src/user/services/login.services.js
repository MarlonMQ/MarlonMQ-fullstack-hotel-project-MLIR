import DbConnection from "../../config/dbconnection.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


class LoginServices {
  static async login(email, password) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('email', email)
      .input('password', password)
      .query('SELECT * FROM password WHERE email = @email AND password = @password');
    await DbConnection.getInstance().closeConnection();
    if (result.recordset.length === 0) {
      return null;
    }
    return result.recordset;
  }

  static async generateAccessToken(user) {
    try {
      return jwt.sign(
        { email: user[0].email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );
    }
    catch (error) {
      console.log(error);
    }
  }

  static async getRol (email) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('email', email)
      .query('SELECT rol FROM t_user WHERE email = @email');
    await DbConnection.getInstance().closeConnection();
    return result.recordset[0].rol;
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
}

export default LoginServices;

