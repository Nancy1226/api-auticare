import dotenv from 'dotenv';
dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 3000,
    
    mysql_host: process.env.MYSQL_HOST,
    mysql_port: Number(process.env.MYSQL_PORT), 
    mysql_user: process.env.MYSQL_USER,
    mysql_password: process.env.MYSQL_PASSWORD,
    mysql_database: process.env.MYSQL_DATABASE,
  },
  whatsapp: {
    apiToken: process.env.WHATSAPP_API_TOKEN,
    testPhoneNumber: process.env.TEST_PHONE_NUMBER,
  },
};
