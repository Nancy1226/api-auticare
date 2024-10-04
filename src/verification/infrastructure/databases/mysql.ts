// import mysql from 'mysql2/promise';
// import { config } from '../../../config'

// const mysqlConfig = {
//   host: config.server.mysql_host,
//   port: config.server.mysql_port,  
//   user: config.server.mysql_user, 
//   password: config.server.mysql_password,
//   database: config.server.mysql_database,  
// };

// export const query = async (sql: string, params: any[]) => {
//   console.log('Connecting to MySQL');
//   const conn = await mysql.createConnection(mysqlConfig);
//   try {
//     const [result] = await conn.execute(sql, params);
//     return result;
//   } finally {
//     console.log('Closing MySQL connection');
//     await conn.end();
//   }
// };

import mysql from 'mysql2/promise';
import { config } from '../../../config'

const mysqlConfig = {
  host: config.server.mysql_host,
  port: config.server.mysql_port,  
  user: config.server.mysql_user, 
  password: config.server.mysql_password,
  database: config.server.mysql_database,
  connectTimeout: 10000, // 10 segundos de tiempo de espera para la conexión
};

// Crear un pool de conexiones en lugar de una conexión individual
const pool = mysql.createPool(mysqlConfig);

export const query = async (sql: string, params: any[]) => {
  console.log('Ejecutando consulta MySQL');
  try {
    const [result] = await pool.execute(sql, params);
    return result;
  } catch (error) {
    console.error('Error al ejecutar la consulta MySQL:', error);
    throw error;
  }
};

// Función para verificar la conexión
export const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a MySQL establecida correctamente');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error al conectar con MySQL:', error);
    return false;
  }
};