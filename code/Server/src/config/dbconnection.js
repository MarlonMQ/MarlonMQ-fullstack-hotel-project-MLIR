import sql from 'mssql';

const bdConfig = {
  user: 'sa',
  password: 'Ignacio01.',
  server: 'localhost',
  database: 'hotel_db',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

class DbConnection {
  static instance = null;
  pool = null;

  constructor() {
    if (DbConnection.instance) {
      return DbConnection.instance;
    }
    DbConnection.instance = this;
  }

  static getInstance() {
    if (!DbConnection.instance) {
      DbConnection.instance = new DbConnection();
      console.log('New instance created');
    }
    return DbConnection.instance;
  }

  async getConnection() {
    try {
      if (this.pool) {
        await this.pool.close();
        console.log('Previous connection closed');
      }
      this.pool = await sql.connect(bdConfig);
      return this.pool;
    } catch (error) {
      console.error('Connection error', error);
    }
  }

  async closeConnection() {
    try {
      if (this.pool) {
        await this.pool.close();
      }
    } catch (error) {
      console.error('Error closing connection', error);
    }
  }
}

export default DbConnection;
