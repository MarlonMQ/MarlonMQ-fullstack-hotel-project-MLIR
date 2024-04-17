import sql from 'mssql';

const bdConfig = {
  user: 'sa',
  password: 'Ignacio01.',
  server: 'localhost', // Puedes cambiar esto por la dirección de tu servidor
  database: 'database_app',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(bdConfig);
    console.log('Conexión exitosa a la base de datos');
    return pool;
  } catch (error) {
    console.error('Error de conexión', error);
  }
};

