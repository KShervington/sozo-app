export interface User {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  bio?: string;
}

export interface UserPatch {
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
}
