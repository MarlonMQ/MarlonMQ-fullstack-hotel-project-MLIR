import SignupServices from "../services/signUp.services.js";

class SignupController {
  static async signup(req, res) {
    console.log('POST /signup');
    try {
      const { email, password, name, lastName, phone, birthDate, rol} = req.body;

      const user = await SignupServices.findUser(email);

      if (user.length > 0) {
        res.status(400).json({ message: 'User already exists' });
        return;
      } else {
        const result = await SignupServices.signup(email, name, lastName, phone, birthDate, rol);
        console.log(result)
        if (result === undefined) {
          
          
          await SignupServices.signupPassword(email, password);
  
          res.status(200).json({ message: 'User registered successfully' });
        }
      }
    } catch (error) {
      res.status(401);
    }
  }
}

export default SignupController;