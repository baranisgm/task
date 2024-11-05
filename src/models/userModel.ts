export interface User {
    id: number;
    username: string;
    password: string;  // Hashed password
  }
  
  export const users: User[] = [];
  