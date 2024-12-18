
import { JWTTokenService } from '../services/JWTTokenService';
import { User } from '../models/User';
import { JWTUtils } from '../utils/JWTUtils';

export class AuthController {
  static login(req: any, res: any): void {
    const { username, email, expiry } = req.body;

    const user = new User('123', username, email, 'user');

    const token = JWTTokenService.createToken(user, expiry);

    res.json({ token });
  }

  static protectedRoute(req: any, res: any): void {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).json({ message: 'Token is required' });
    }

    try {
      const decoded = JWTTokenService.verifyToken(token);
      const isValid = JWTUtils.validateExpiry(decoded);

      if (!isValid) {
        return res.status(401).json({ message: 'Token expired' });
      }

      res.json({ message: 'Access granted to protected route', decoded });
    } catch (err) {
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}
