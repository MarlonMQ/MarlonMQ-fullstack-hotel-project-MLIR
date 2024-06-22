import MyAccountServices from "../services/myAccount.js";
import dotenv from 'dotenv';

dotenv.config();

class MyAccountController {
  static async getMyAccountData(req, res) {
    const { token } = req.body;
    try {
      const email = await MyAccountServices.getEmail(token);
      
      
      const myAccountData = await MyAccountServices.getMyAccountData(email);
      if (!myAccountData) {
        res.status(404).json({ message: 'No data found' });
        return;
      }
      res.status(200).json(myAccountData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default MyAccountController;