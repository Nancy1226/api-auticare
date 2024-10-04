export class Verification {
    constructor(
      public id: number | null,
      public uuid: string,
      public phoneNumber: string,
      public verificationCode: string,
      public createdAt: Date
    ) {}
  }
  