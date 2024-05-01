import LoginServices from "../services/login.services.js";

class LoginController {
  static async login(req, res) {
    console.log('POST /login');
    try {
      const { email, password } = req.body;
      const user = await LoginServices.login(email, password);
      if (!user) {

        res.status(401);
        res.send('Invalid email or password');
        
      } else {
        const rol = await LoginServices.getRol(email);
        const accessToken = await LoginServices.generateAccessToken(user);

        res.status(200);
        res.header('authorization', rol, accessToken).json({
          message: 'Login successful',
          rol : rol,
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