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
    const {email, name, lastName, phone, birthDate, country, region, address, profile_image, password, newPassword, changingPassword } = req.body;
    if (changingPassword === 1) {
      const result = await MyAccountServices.changePassword(email, password, newPassword);
      if (!result) {
        
        res.status(404).send({
          message: 'User not found'
        });
        return;
      } else {

        res.status(201).send({
          message: 'Password updated successfully'
        });
        return;
      }
    } else if(changingPassword === 2) {
      try {
        const result = await MyAccountServices.deleteMyAccount(email, password);
        if (!result) {
          res.status(404).send({
            message: 'User not found'
          });
          return;
        } else {
          res.status(202).send({
            message: 'User deleted successfully'
          });
        }
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      try {
        const result = await MyAccountServices.updateMyAccount(email, name, lastName, phone, birthDate, country, region, address, profile_image );
        res.status(200).send({
          message: 'User updated successfully'
        });
      } catch (error) {
        res.status(500).send(error.message);
      }

    }
  }

    
}

export default MyAccountController;