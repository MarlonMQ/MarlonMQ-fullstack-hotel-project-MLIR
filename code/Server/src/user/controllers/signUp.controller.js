import SignupServices from "../services/signUp.services.js";
import dotenv from 'dotenv';

dotenv.config();

class SignupController {
  static async signup(req, res) {
    try {
      const { email, password, name, lastName, phone, birthDate, rol} = req.body;

      const user = await SignupServices.findUser(email);

      if (user.length > 0) {
        res.status(400).json({ message: 'User already exists' });
        return;
      } else {
        const result = await SignupServices.signup(email, name, lastName, phone, birthDate, rol);

        if (result === undefined) {
          const encryptedPassword = await SignupServices.encrypt(password, process.env.SECRET_KEY);
          await SignupServices.signupPassword(email, encryptedPassword);
  
          res.status(200).json({ message: 'User registered successfully' });
        }
      }
    } catch (error) {
      res.status(401);
    }
  }
}

export default SignupController;