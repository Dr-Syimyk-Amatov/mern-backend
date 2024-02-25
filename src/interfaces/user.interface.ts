export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
}

export interface RegisterUserResponse extends User {
  token: string;
}
