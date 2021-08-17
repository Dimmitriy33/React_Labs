export default interface IGame {
  id: string;
  name: string;
  platform: string;
  dateCreated: Date;
  totalRating: number;
  genre: string;
  rating: number;
  logo: string;
  background: string;
  price: number;
  count: number;
  isDeleted: boolean;
}

export interface ICreateGame {
  name: string;
  platform: string;
  totalRating: string;
  genre: string;
  age: string;
  logo: File;
  background: File;
  price: string;
  count: string;
}

export interface IUpdateGame {
  id: string;
  name: string;
  platform: string;
  totalRating: string;
  genre: string;
  age: string;
  logo: File;
  background: File;
  price: string;
  count: string;
}
