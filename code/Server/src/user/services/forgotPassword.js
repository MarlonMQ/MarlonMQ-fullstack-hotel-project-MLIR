import DbConnection from "../../config/dbconnection.js";
import sql from "mssql"; // Asegúrate de importar el módulo sql
import nodemailer from 'nodemailer';

class ForgotPasswordServices {
  
  static async sendForgotPasswordEmail(email, name) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetPasswordLink = `http://localhost:5173/reset-password?email=${email}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: `Hello ${name}, you have requested to reset your password. Please click on the following link to reset your password: 

      ${resetPasswordLink}

      If you did not request this, please ignore this email.

      Best regards,
      Your Hotel Team`
    };

    console.log('Sending email');
    return transporter.sendMail(mailOptions);
  }

  static getName(email) {
    return email.split('@')[0];
  }

  static async changePassword(email, password) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .query('UPDATE password SET password = @password WHERE email = @email');
    await DbConnection.getInstance().closeConnection();
    return result.recordset;
  }
  
}

export default ForgotPasswordServices;