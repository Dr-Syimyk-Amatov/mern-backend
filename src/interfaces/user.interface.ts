export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string | null;
}

export interface RegisterUserResponse extends User {
  token: string;
}
