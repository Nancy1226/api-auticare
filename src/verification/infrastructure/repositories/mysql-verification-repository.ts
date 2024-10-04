import { query } from '../databases/mysql'; // Asegúrate de importar RowDataPacket
import { RowDataPacket } from 'mysql2/promise'; // Importa RowDataPacket desde mysql2/promise
import { Verification } from '../../domain/verification';
import { VerificationRepository } from '../../domain/verification-repository';

export class MysqlVerificationRepository implements VerificationRepository {
  
   // Crear una entrada de verificación en la base de datos
   async create(verification: Verification): Promise<Verification> {
       const sqlVerification = 
           `INSERT INTO verifications (uuid, phoneNumber, verificationCode, createdAt)
           VALUES (?, ?, ?, ?)`;
       const values = [verification.uuid, verification.phoneNumber, verification.verificationCode, verification.createdAt];
       
       const result: any = await query(sqlVerification, values);

       const verificationId = result.insertId;

       return new Verification(
           verificationId,
           verification.uuid,
           verification.phoneNumber,
           verification.verificationCode,
           verification.createdAt
       );
   }

   // Buscar la verificación por ID y código
   async findByUuidAndCode(uuid: string, code: string): Promise<Verification | null> {
       const sqlVerification = `
           SELECT * FROM verifications
           WHERE uuid = ? AND verificationCode = ?`;
       const params = [uuid, code];
       const rows = await query(sqlVerification, params) as RowDataPacket[]; // Asegurar que es un array

       if (rows.length === 0) {
           return null;
       }

       const row = rows[0];
       return new Verification(row.id, row.uuid, row.phoneNumber, row.verificationCode, row.createdAt);
   }

   // Eliminar la verificación una vez validada
   async delete(uuid: string): Promise<void> {
       const sqlVerification = `
           DELETE FROM verifications
           WHERE uuid = ?`;
       await query(sqlVerification, [uuid]);
   }

   // Guardar la información de la verificación
   async save(data: { phoneNumber: string; message: string; sentAt: Date }): Promise<void> {
    const sqlSave = 'INSERT INTO verification_logs (phone_number, message, sent_at) VALUES (?, ?, ?)'; // Cambia el nombre de la tabla a donde quieras guardar la información

    try {
        // Ejecuta la consulta para guardar los datos
        await query(sqlSave, [data.phoneNumber, data.message, data.sentAt]);
    } catch (error) {
        console.error('Database connection error: ', error);
        throw error; // Opcionalmente lanza el error para manejarlo más arriba en la pila
    }
  }

}
