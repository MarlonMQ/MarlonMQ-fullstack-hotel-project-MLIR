import ForgotPasswordServices from "../services/forgotPassword.js";
import SignupServices from "../services/signUp.js";

class ForgotPasswordController {
  static async forgotPassword(req, res) {
   try {
      // Obtener el correo electrónico del cuerpo de la solicitud
      const { email } = req.body;

      const name = ForgotPasswordServices.getName(email);

      ForgotPasswordServices.sendForgotPasswordEmail(email, name);

      res.status(200);
      res.send({
        message: 'Email send successfully'
      })
    } catch (error) {
      res.status(500);
      res.send('Error sending email');
    }
  }

  static async changePassword(req, res) {

    try {
      const { email, password } = req.body;

      const encryptedPassword = await SignupServices.encrypt(password, process.env.SECRET_KEY);
      await ForgotPasswordServices.changePassword(email, encryptedPassword);

      res.status(200);
      res.send({
        message: 'Password changed successfully'
      });
    } catch (error) {
      console.error(error);
      console.log(error);
      res.status(500);
      res.send('Error changing password');
    }
  }
}

export default ForgotPasswordController;