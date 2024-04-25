import sql from 'mssql';
// import bdConfig from './dbconfig.json'

const bdConfig = {
  "user": "sa",
  "password": "Ignacio01.",
  "server": "localhost",
  "database": "hotel_db",
  "options": {
    "encrypt": false,
    "trustServerCertificate": true
  }
}

let instance = null;

class DbConnection {
  constructor() {
    this.pool = null;
  }

  static getInstance() {
    if (!instance) {
      instance = new DbConnection();
    }
    return instance;
  }

  async getConnection() {
    try {
      if (this.pool) {
        await this.pool.close(); // Si ya existe una conexión, la cerramos
        console.log('Conexión anterior cerrada');
      }
      this.pool = await sql.connect(bdConfig);
      return this.pool;
    } catch (error) {
      console.error('Error de conexión', error);
    }
  }

  async closeConnection() {
    try {
      if (this.pool) {
        await this.pool.close();
      }
    } catch (error) {
      console.error('Error al cerrar la conexión', error);
    }
  }
}

export default DbConnection;
