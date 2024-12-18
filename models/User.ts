export class User {
    constructor(
      public id: string,
      public username: string,
      public email: string,
      public role: string
    ) {}
  
    static fromPayload(payload: { username: string, email: string, role: string }) {
      return new User(payload.username, payload.email, payload.role, 'user');
    }
  }
  