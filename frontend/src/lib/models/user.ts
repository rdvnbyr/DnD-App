
export interface UserCredentials {
  id?: string;
  email: string;
  username?: string;
  password?: string;
  role?: "admin" | "user";
  licence?: string;
  avatar?: string;
}

export interface UserResponse {
  user: UserCredentials;
  token: string;
}

export class User {
  id?: string;
  email: string;
  password?: string;
  username?: string;
  role?: "admin" | "user";
  avatar?: string;
  constructor({ email, password, username, role, id, avatar }: UserCredentials) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.role = role;
    this.id = id;
    this.avatar = avatar;
  }
}
