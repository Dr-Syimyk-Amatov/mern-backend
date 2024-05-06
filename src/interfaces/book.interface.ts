import { User } from "./user.interface";

export interface BookResponse {
  name: string;
  user: User;
  fileUrl?: string;
  author?: string;
  pagesCount?: string;
  releaseDate?: string;
  publishYear?: number;
}
