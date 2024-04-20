import UserServices from '../services/user.services.js';

class UserController {

  static async getUsers(req, res) {
    console.log('GET /users');
    try {
      const users = await UserServices.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  static async getUserById(req, res) {
    console.log('GET /users/:id');
    try {
      const { id } = req.params;
      const user = await UserServices.getUserById(id);
      res.json(user);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  static async createUser(req, res) {
    console.log('POST /users');
    try {
      const { username, password } = req.body;
      if (username && password) {
        const newUser = await UserServices.createUser({ username, password });
        res.json(newUser);
      } else {
        res.status(400);
        res.send('Please provide name and password');
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  static async updateUserById(req, res) {
    console.log('PUT /users/:id');
    try {
      const { id } = req.params;
      const { username, password } = req.body;
      if (username && password) {
        const updatedUser = await UserServices.updateUserById(id, { username, password });
        res.json(updatedUser);
      } else {
        res.status(400);
        res.send('Please provide name and password');
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  static async deleteUser(req, res) {
    console.log('DELETE /users/:id');
    try {
      const { id } = req.params;
      const deletedUser = await UserServices.deleteUser(id);
      res.json(deletedUser);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

export default UserController;
