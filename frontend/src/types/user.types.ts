export type Role = "STUDENT" | "TEACHER" | "ADMIN";

export type UserStatus = "PENDING" | "ACTIVE" | "DISABLED";

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
}

export interface UserResponse {
  message: string;
  users: User[];
}

export interface SingleUserResponse {
  message: string;
  user: User;
}
