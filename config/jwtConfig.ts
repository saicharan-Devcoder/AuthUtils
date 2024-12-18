export const JWTConfig = {
    secretKey: process.env.JWT_SECRET_KEY || 'your-secret-key', 
    defaultExpiry: process.env.JWT_SECRET_KEY_EXPIRY ,  
  };