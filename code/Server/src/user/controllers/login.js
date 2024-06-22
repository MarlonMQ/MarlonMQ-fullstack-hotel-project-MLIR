import LoginServices from "../services/login.js";

class LoginController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await LoginServices.login(email, password);
      if (!user) {

        res.status(404);
        res.send('Invalid email or password');
        
      } else {
        const rol = await LoginServices.getRol(email);
        const accessToken = await LoginServices.generateAccessToken(email);

        res.status(200);
        res.send({
            message: 'Login successful',
            rol: rol,
            token: accessToken
        });
        
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

export default LoginController;