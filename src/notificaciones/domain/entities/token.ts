import { v4 as uuidv4 } from "uuid";

export class Token {
  id: number | null;
  token: string;
  validAt: Date;
  userId: number;
  status: string; // 'habilitado' o 'inhabilitado'
  uuid: string;

  constructor(
    id: number | null,
    token: string,
    validAt: Date,
    userId: number,
    status: string,
    uuid?: string
  ) {
    this.id = id;
    this.token = token;
    this.validAt = validAt;
    this.userId = userId;
    this.status = status;
    this.uuid = uuid || uuidv4();
  }
}
