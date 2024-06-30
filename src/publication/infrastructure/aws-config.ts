// infrastructure/aws-config.ts
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN, 
  region: process.env.AWS_REGION
});

export const s3 = new AWS.S3();



// PARA CUANDO TENGO AWS CLI CONFIGURADO EN MI ENTORNO
// import AWS from 'aws-sdk';

// // AWS SDK automáticamente usará las credenciales configuradas por AWS CLI
// export const s3 = new AWS.S3();
