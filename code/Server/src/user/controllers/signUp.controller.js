import SignupServices from "../services/signUp.services.js";

class SignupController {
  static async signup(req, res) {
    console.log('POST /signup');
    try {
      const { email, name, lastName, phone, birthDate, rol} = req.body;
      const result = await SignupServices.signup(email, name, lastName, phone, birthDate, rol);
      if (!result) {
        res.status(401);
        res.send('User already exists or registration failed');
      } else {
        res.status(201).json({ message: 'User registered successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default SignupController;