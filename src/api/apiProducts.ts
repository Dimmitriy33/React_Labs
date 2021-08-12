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

export async function getProductsByCategory(category: string): Promise<IGame[]> {
  const result = await fetch(`/api/games/list`);
  const products: IGame[] = await result.json();

  const productsByCategory: IGame[] = [];

  for (let i = 0; i < products.length; i++)
    if (products[i].platform === category) {
      productsByCategory.push(products[i]);
    }

  return productsByCategory;
}

export async function searchProducts(input: string): Promise<IGame[]> {
  const result = await fetch(`/api/games/search?term=${input}&limit=100&offset=0`);
  const products: IGame[] = await result.json();

  return products;
}
