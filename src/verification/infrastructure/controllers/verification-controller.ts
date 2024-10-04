import { Request, Response, NextFunction } from 'express';
import { SendVerificationCodeUseCase } from '../../application/send-verification-code-usecase';
import { VerifyCodeUseCase } from '../../application/verify-code-usecase';
// import { VerificationRepository } from '../../domain/verification-repository';
// import { IMessagingService } from '../../domain/services/IMessagingService';

export class VerificationController {
  constructor(
    private sendVerificationCodeUseCase: SendVerificationCodeUseCase,
    private verifyCodeUseCase: VerifyCodeUseCase,
    // private verificationRepository: VerificationRepository,
    // private messagingService: IMessagingService
  ) {}

  async sendCode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { phoneNumber } = req.body;
        const uuid = require('uuid').v4();

        await this.sendVerificationCodeUseCase.execute(null, uuid, phoneNumber);

        res.status(200).json({ message: 'Verification code sent' });
    } catch (error) {
        next(error);
    }
  }

  async verifyCode(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { uuid, verificationCode } = req.body;
      const isValid = await this.verifyCodeUseCase.execute(uuid, verificationCode);
  
      if (!isValid) {
        res.status(400).json({ message: 'Invalid verification code' });
        return; 
      }
  
      res.status(200).json({ message: 'Code verified successfully' });
    } catch (error) {
      next(error);
    }
  }
  
}
