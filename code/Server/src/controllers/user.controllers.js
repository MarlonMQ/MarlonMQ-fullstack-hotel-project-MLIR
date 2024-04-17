// import { getConnection } from "../database/connection.js";

// export const getUsers = async (req, res) => {
//   console.log('GET /users');
//   try {
//     const pool = await getConnection();
//     const result = await pool.request().query('SELECT * FROM Users');
//     res.json(result.recordset);
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// }

// export const getUserById = async (req, res) => {
//   console.log('GET /users/:id');
//   try {
//     const { id } = req.params;
//     const pool = await getConnection();
//     const result = await pool.request().query(`SELECT * FROM Users WHERE id = ${id}`);
//     res.json(result.recordset);
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// }

// export const createUser = async (req, res) => {
//   console.log('POST /users');
//   try {
//     const { username, password } = req.body;
//     if (username && password) {
//       const pool = await getConnection();
//       const result = await pool.request().query(`INSERT INTO Users (username, password) VALUES ('${username}', '${password}')`);
//       res.json(result);
//     } else {
//       res.status(400);
//       res.send('Please provide name and password');
//     }
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// }

// export const updateUserById = async (req, res) => {
//   console.log('PUT /users/:id');
//   try {
//     const { id } = req.params;
//     const { username, password } = req.body;
//     if (username && password) {
//       const pool = await getConnection();
//       const result = await pool.request().query(`UPDATE Users SET username = '${username}', password = '${password}' WHERE id = ${id}`);
//       res.json(result);
//     } else {
//       res.status(400);
//       res.send('Please provide name and password');
//     }
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// }

// export const deleteUser = async (req, res) => {
//   console.log('DELETE /users/:id');
//   try {
//     const { id } = req.params;
//     const pool = await getConnection();
//     const result = await pool.request().query(`DELETE FROM Users WHERE id = ${id}`);
//     res.json(result);
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// }


