import { JWTUtils } from '../utils/JWTUtils';
import { User } from '../models/User';
import { JwtPayload } from 'jsonwebtoken';

export class JWTTokenService {

  static createToken(user: User, expiry: string): string {
    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
      customClaim: 'some-custom-claim-value', 
    };
    return JWTUtils.generateToken(payload,expiry );
  }

  static verifyToken(token: string): string | JwtPayload{
    return JWTUtils.verifyToken(token);
  }

  static getUserFromToken(token: string): string | JwtPayload | null {
    const decodedToken = JWTUtils.decodeToken(token);
    if (decodedToken) {
      return decodedToken; 
    }
    return null;
  }
}
