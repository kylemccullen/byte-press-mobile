export enum Role {
  ADMIN = "Admin",
  USER = "User",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface UpdateUser {
  name: string;
}

export interface UserOverview extends User {
  completedTaskCount: number;
  totalTaskCount: number;
}
