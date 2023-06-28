import mysql from 'mysql2/promise';

const config = {
  host: '3.217.106.192',
  user: 'fran',
  database: 'bdbroker',
  password: 'passf123',
};

export const query = async (sql: string, params: any[]) => {
  console.log('Mysql');
  const conn = await mysql.createConnection(config);
  try {
    const result = await conn.execute(sql, params);
    return result;
  } finally {
    console.log('Todo ok');
    await conn.end();
  }
};
