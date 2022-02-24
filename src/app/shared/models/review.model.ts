import { FileUpload } from "./file-upload.model";

export interface Review {
  title: string;
  author: string;
  review: string;
  rating: number;
  userId: string;
  userEmail: string;
  id: string;
  uploads:string[];
}