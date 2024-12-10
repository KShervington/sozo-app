export interface User {
  username: string;
  email: string;
  password: string;
  walletAddress?: string;
  bio?: string;
  createdAt: Date;
}

export interface UserPatch {
  username?: string;
  email?: string;
  password?: string;
  walletAddress?: string;
  bio?: string;
}
