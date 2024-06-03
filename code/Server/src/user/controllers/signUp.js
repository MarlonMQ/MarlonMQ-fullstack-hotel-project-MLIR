import SignupServices from "../services/signUp.js";
import dotenv from 'dotenv';

dotenv.config();

class SignupController {
  static async signup(req, res) {
    try {
      const { email, password, name, lastName, phone, birthDate, rol } = req.body;

      const user = await SignupServices.findUser(email);

      if (user.length > 0) {
        res.status(400).send({
          message: 'User already exists'
        });

      } else {
        const result = await SignupServices.signup(email, name, lastName, phone, birthDate, rol);

        if (result === undefined) {
          const encryptedPassword = await SignupServices.encrypt(password, process.env.SECRET_KEY);
          await SignupServices.signupPassword(email, encryptedPassword);

          // Enviar correo de confirmación
          try {
            // Enviar correo de confirmación
            await SignupServices.sendSignupEmail(email, name);

            res.status(201).send({
              message: 'User registered successfully'
            });
          } catch (emailError) {
            console.error('Failed to send email:', emailError);
            res.status(500).send({
              message: 'User registered but failed to send confirmation email'
            });
          }
        }
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default SignupController;
