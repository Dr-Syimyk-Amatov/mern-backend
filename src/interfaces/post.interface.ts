import { User } from "./user.interface";

export interface Post {
  id: string;
  title: string;
  content: string;
  viewCounts: number;
  author: User;
}
