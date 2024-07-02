import MyAccountServices from "../services/myAccount.js";
import dotenv from 'dotenv';

dotenv.config();

class MyAccountController {
  static async getMyAccountData(req, res) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];
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

  static async updateMyAccountData(req, res) {
    
  }
}

export default MyAccountController;