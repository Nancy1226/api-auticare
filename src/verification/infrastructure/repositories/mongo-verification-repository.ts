import { Verification } from '../../domain/verification';
import { VerificationRepository } from '../../domain/verification-repository';
import { VerificationModel } from '../schemas/verification-schema'; // Asegúrate de que este modelo existe
import { VerificationLogModel } from '../schemas/verification-log-schema'; // Asegúrate de tener este modelo para los registros de verificación

export class MongoVerificationRepository implements VerificationRepository {
  
  // Crear una entrada de verificación en la base de datos
  async create(verification: Verification): Promise<Verification> {
    const newVerification = new VerificationModel({
      uuid: verification.uuid,
      phoneNumber: verification.phoneNumber, // Agregar el número de teléfono al nuevo modelo
      verificationCode: verification.verificationCode,
      createdAt: verification.createdAt
    });
    
    const savedVerification = await newVerification.save();
    return new Verification(
      savedVerification.id,
      savedVerification.uuid,
      savedVerification.phoneNumber,
      savedVerification.verificationCode,
      savedVerification.createdAt
    );
  }

  // Buscar la verificación por UUID y código
  async findByUuidAndCode(uuid: string, code: string): Promise<Verification | null> {
    const foundVerification = await VerificationModel.findOne({ uuid, verificationCode: code });

    if (!foundVerification) {
      return null;
    }

    return new Verification(
      foundVerification.id,
      foundVerification.uuid,
      foundVerification.phoneNumber,
      foundVerification.verificationCode,
      foundVerification.createdAt
    );
  }

  // Eliminar la verificación por UUID
  async delete(uuid: string): Promise<void> {
    await VerificationModel.deleteOne({ uuid });
  }

  // Guardar la información de la verificación enviada
  async save(data: { phoneNumber: string; message: string; sentAt: Date }): Promise<void> {
    const newVerificationLog = new VerificationLogModel({
      phoneNumber: data.phoneNumber,
      message: data.message,
      sentAt: data.sentAt,
    });

    await newVerificationLog.save();
  }
}
