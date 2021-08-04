import ConnectionString from "@/constants/hostInfo";
import IGame from "../models/productModel";

async function getProductsByCategory(category: string): Promise<IGame[]> {
  const result = await fetch(`${ConnectionString}/api/games/list`);
  const products: Array<IGame> = await result.json();

  const productsByCategory = Array<IGame>();

  for (let i = 0; i < products.length; i++)
    if (products[i].platform === category) {
      productsByCategory.push(products[i]);
    }

  return productsByCategory;
}
export default getProductsByCategory;
