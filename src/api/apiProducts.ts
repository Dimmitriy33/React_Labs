import connectionString from "@/constants/db";
import IGame, { ICreateGame, IUpdateGame } from "@/redux/types/productState";

export async function getTopProducts(count: number): Promise<IGame[]> {
  const result = await fetch(`/api/games/list?SortField=Rating&limit=${count}&ordertype=Desc`);
  const topProducts: Array<IGame> = await result.json();

  return topProducts;
}

export async function getProductsList(): Promise<IGame[]> {
  const result = await fetch(`/api/games/list`);
  const products: Array<IGame> = await result.json();

  return products;
}

export async function getProductsByCategory(category: string, productsList: IGame[] | null = null): Promise<IGame[]> {
  const products: IGame[] = productsList === null ? await getProductsList() : productsList;

  const productsByCategory: IGame[] = [];

  for (let i = 0; i < products.length; i++)
    if (products[i].platform === category) {
      productsByCategory.push(products[i]);
    }

  return productsByCategory;
}

export async function searchProducts(input: string): Promise<IGame[]> {
  const result = await fetch(`/api/games/search?term=${input}&limit=20&offset=0`);
  const products: IGame[] = await result.json();

  return products;
}

export async function getFilteredAndSortedProducts(
  sortField: string,
  orderType: string,
  filterType: string,
  filterValue: string
): Promise<IGame[] | number> {
  const result = await fetch(
    `/api/games/list?SortField=${sortField}&ordertype=${orderType}&FilterType=${filterType}&FilterValue=${filterValue}`
  );

  if (!result.ok) {
    return result.status;
  }

  const products: Array<IGame> = await result.json();

  return products;
}

export async function createGame(game: ICreateGame, token: string): Promise<boolean> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formdata = new FormData();
  formdata.append("name", game.name);
  formdata.append("platform", game.platform);
  formdata.append("totalRating", game.totalRating.toString());
  formdata.append("genre", game.genre);
  formdata.append("rating", game.age.toString());
  formdata.append("price", game.price.toString());
  formdata.append("count", game.count.toString());
  formdata.append("logo", game.logo);
  formdata.append("background", game.background);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
  };

  const result = await fetch(`${connectionString}/api/games`, requestOptions);

  if (result.ok) {
    return true;
  }

  return false;
}

export async function updateGame(game: IUpdateGame, token: string): Promise<boolean> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formdata = new FormData();
  formdata.append("id", game.id);
  formdata.append("name", game.name);
  formdata.append("platform", game.platform);
  formdata.append("totalRating", game.totalRating.toString());
  formdata.append("genre", game.genre);
  formdata.append("rating", game.age.toString());
  formdata.append("price", game.price.toString());
  formdata.append("count", game.count.toString());
  formdata.append("logo", game.logo);
  formdata.append("background", game.background);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: formdata,
  };

  const result = await fetch(`${connectionString}/api/games`, requestOptions);

  if (result.ok) {
    return true;
  }

  return false;
}

export async function removeGame(id: string, token: string): Promise<boolean> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const result = await fetch(`${connectionString}/api/games/id/${id}`, requestOptions);

  if (result.ok) {
    return true;
  }

  return false;
}
