import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWTConfig } from '../config/jwtConfig';

interface CustomJwtPayload {
  [key: string]: any;
}

export class JWTUtils {
  static generateToken(payload: CustomJwtPayload, expiry: string): string {
    const options = { expiresIn: expiry };
    return jwt.sign(payload, JWTConfig.secretKey, options);
  }

  static verifyToken(token: string): string | object {
    try {
      return jwt.verify(token, JWTConfig.secretKey);
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }

  static decodeToken(token: string): string | null| JwtPayload {
    return jwt.decode(token);
  }

  static validateExpiry(decoded: object|string): boolean {
    const exp = (decoded as any).exp;
    const now = Math.floor(Date.now() / 1000); 
    return exp > now;
  }

  static getCustomClaim(decoded: object, claim: string): any {
    return (decoded as any)[claim];
  }
}
