import IGame from "../models/productModel";

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
