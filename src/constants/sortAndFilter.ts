/* eslint-disable no-shadow */
export const sortFieldOptions = [
  { value: "Name", label: "Name" },
  { value: "Rating", label: "Rating" },
  { value: "Price", label: "Price" },
];

export const filterTypeOptions = [
  { value: "", label: "" },
  { value: "Genre", label: "Genre" },
  { value: "Age", label: "Age" },
];

export const ordertypeOptions = [
  { value: "Asc", label: "Asc" },
  { value: "Desc", label: "Desc" },
];

export const genreFilterValueOptions = [
  { value: "", label: "" },
  { value: "RolePlaying", label: "RolePlaying" },
  { value: "Action", label: "Action" },
  { value: "Strategy", label: "Strategy" },
  { value: "Simulation", label: "Simulation" },
  { value: "Esports", label: "Esports" },
  { value: "MMO", label: "MMO" },
  { value: "Adventure", label: "Adventure" },
];

export const ageFilterValueOptions = [
  { value: "", label: "" },
  { value: "0", label: "0" },
  { value: "6", label: "6" },
  { value: "12", label: "12" },
  { value: "16", label: "16" },
];

export enum orderTypes {
  Asc = "Asc",
  Decs = "Desc",
}

export enum sortFields {
  Name = "Name",
  Rating = "Rating",
  Price = "Price",
}

export enum filterTypes {
  Genre = "Genre",
  Age = "Age",
}
