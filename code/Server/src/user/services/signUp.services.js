import DbConnection from "../../config/dbconnection.js";

class SignupServices {
  static async signup(email, password, name, lastName, phone, birthDate, rol) {
    const pool = await DbConnection.getInstance().getConnection();
    const result = await pool.request()
        .input('email', email)
        .input('name', name)
        .input('lastName', lastName)
        .input('phone', phone)
        .input('birthDate', birthDate)
        .input('rol', rol)
        .input('password', password)
        .query('INSERT INTO t_users (email, name, lastName, phone_number, birth_date, rol, password) VALUES (@email, @name, @lastName, @phone, @birthDate, @rol)');
    await DbConnection.getInstance().closeConnection();
    return result;
  }
}

export default SignupServices;
