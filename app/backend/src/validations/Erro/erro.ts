import { JsonWebTokenError } from 'jsonwebtoken';

enum JoiTypes {
  ANY_REQUIRED = 'any.required',
  STRING_BASE = 'string.base',
  STRING_EMAIL = 'string.email',
  STRING_MIN = 'string.min',
  STRING_EMPTY = 'string.empty',
}

export default class ErroType {
  constructor(private _erro: any) {
    this.verifyErrorType(_erro);
  }

  public get erro() {
    return this._erro;
  }

  private handleUnknown() {
    const message = 'Internal server Error';
    this.defineError(500, message);
  }

  private handleJoi() {
    const { type, message } = this._erro.details[0];
    switch (type) {
      case JoiTypes.ANY_REQUIRED:
        this.defineError(400, message);
        break;
      case JoiTypes.STRING_EMPTY:
        this.defineError(400, message);
        break;
      case JoiTypes.STRING_EMAIL:
        this.defineError(401, message);
        break;
      default:
        this.defineError(401, message);
        break;
    }
  }

  private handleMessage() {
    const { code, message } = this._erro;
    this.defineError(code, message);
  }

  private handleJWT() {
    const { message } = this._erro;
    this.defineError(401, message);
  }

  private defineError(code: number, message: string) {
    this._erro.code = code;
    this._erro.message = message;
    this._erro = { code, message };
  }

  private verifyErrorType(err: any) {
    if (err.isJoi) return this.handleJoi();
    if (err.code) return this.handleMessage();
    if (err instanceof JsonWebTokenError) return this.handleJWT();
    return this.handleUnknown();
  }
}
