import IGame from "./productModel";

async function getProductsByCategory(category: string): Promise<IGame[]> {
  const result = await fetch(`http://localhost:8000/api/games/list`);
  const products: Array<IGame> = await result.json();

  const productsByCategory = Array<IGame>();

  for (let i = 0; i < products.length; i++)
    if (products[i].platform === category) {
      productsByCategory.push(products[i]);
    }

  return productsByCategory;
}
export default getProductsByCategory;
