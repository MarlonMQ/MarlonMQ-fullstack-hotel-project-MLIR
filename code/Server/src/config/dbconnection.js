// import sql from 'mssql';
// import dotenv from 'dotenv';

// dotenv.config();

// const bdConfig = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   server: process.env.DB_SERVER,
//   database: process.env.DB_DATABASE,
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//   }
// };

// class DbConnection {
//   static instance = null;
//   pool = null;

//   constructor() {
//     if (DbConnection.instance) {
//       return DbConnection.instance;
//     }
//     DbConnection.instance = this;
//   }

//   static getInstance() {
//     if (!DbConnection.instance) {
//       DbConnection.instance = new DbConnection();
//       console.log('New instance created');
//     }
//     return DbConnection.instance;
//   }

//   async getConnection() {
//     try {
//       if (this.pool) {
//         await this.pool.close();
//         console.log('Previous connection closed');
//       }
//       this.pool = await sql.connect(bdConfig);
//       return this.pool;
//     } catch (error) {
//       console.error('Connection error', error);
//     }
//   }

//   async closeConnection() {
//     try {
//       if (this.pool) {
//         await this.pool.close();
//       }
//     } catch (error) {
//       console.error('Error closing connection', error);
//     }
//   }
// }

// export default DbConnection;
import sql from 'mssql';
// import bdConfig from './dbconfig.json'

const bdConfig = {
  "user": "usr_aas",
  "password": "pwd_lisandro",
  "server": "localhost",
  "database": "HotelHazbin",
  "port": 58339,
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
      console.log('Conexión exitosa a la base de datos');
      return this.pool;
    } catch (error) {
      console.error('Error de conexión', error);
    }
  }

  async closeConnection() {
    try {
      if (this.pool) {
        await this.pool.close();
        console.log('Conexión cerrada');
      }
    } catch (error) {
      console.error('Error al cerrar la conexión', error);
    }
  }
}

export default DbConnection;
