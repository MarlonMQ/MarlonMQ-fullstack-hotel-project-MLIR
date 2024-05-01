import DbConnection from "../../config/dbconnection.js";

class SignupServices {
  static async signup(email, name, lastName, phone_number, birth_date, rol) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
        .input('email', email)
        .input('name', name)
        .input('lastName', lastName)
        .input('phone_number', phone_number)
        .input('birth_date', birth_date)
        .input('rol', rol)
        .query('INSERT INTO t_users (email, name, lastName, phone_number, birth_date, rol) VALUES (@email, @name, @lastName, @phone_number, @birth_date, @rol)');
    await DbConnection.getInstance().closeConnection();
    return result;
  }
}

export default SignupServices;
