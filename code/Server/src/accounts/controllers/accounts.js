import AccountsServices from "../services/accounts.js";
import dotenv from 'dotenv';

dotenv.config();

class AccountsController {
  static async createAccount(req, res) {
    try {
      const { email, name, lastName, phone, birthDate, rol } = req.body;

      const user = await AccountsServices.findUser(email);
      if (user.length > 0) {
        res.status(400).send({
          message: 'User already exists'
        });
      } else {
        const result = await AccountsServices.signup(email, name, lastName, phone, birthDate, rol);

        if (result === undefined) {
          const password = await AccountsServices.generatePassword();
          const encryptedPassword = await AccountsServices.encrypt(password, process.env.SECRET_KEY);
          await AccountsServices.signupPassword(email, encryptedPassword);
          // Enviar correo de confirmación
          try {
            // Enviar correo de confirmación
            await AccountsServices.sendSignupEmail(email, name, password);

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

export default AccountsController;
