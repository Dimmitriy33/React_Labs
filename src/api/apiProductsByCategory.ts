import IGame from "../models/productModel";

export default async function getProductsByCategory(category: string): Promise<IGame[]> {
  const result = await fetch(`/api/games/list`);
  const products: IGame[] = await result.json();

  const productsByCategory: IGame[] = [];

  for (let i = 0; i < products.length; i++)
    if (products[i].platform === category) {
      productsByCategory.push(products[i]);
    }

  return productsByCategory;
}
