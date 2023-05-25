import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  user: 'root',
  database: 'apiTS',
  password: '',
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
