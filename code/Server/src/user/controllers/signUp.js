import SignupServices from "../services/signUp.js";
import dotenv from 'dotenv';

dotenv.config();

class SignupController {
  static async signup(req, res) {
    try {
      const { email, password, name, lastName, phone, birthDate, rol, country, region, address } = req.body;

      const user = await SignupServices.findUser(email);

      if (user.length > 0) {
        res.status(400);
        res.send({
          message: 'User already exists'
        });
      } else {
        if (!email || !password || !name || !lastName || !phone || !birthDate || !rol || !country || !region || !address) {
          res.status(400);
          res.send({
            message: 'User fields are empty'
          });
        }

        const result = await SignupServices.signup(email, name, lastName, phone, birthDate, rol, country, region, address);

        if (result === undefined) {
          const encryptedPassword = await SignupServices.encrypt(password, process.env.SECRET_KEY);
          await SignupServices.signupPassword(email, encryptedPassword);

          res.status(201).send({
            message: 'User registered successfully'
          });

          try {      
            await SignupServices.sendSignupEmail(email, name);
          } catch (emailError) {
            res.status(500).send({
              message: 'User registered but failed to send confirmation email'
            });
          }
        }
      }
    } catch (error) {
      res.status(500);
    }
  }
}

export default SignupController;