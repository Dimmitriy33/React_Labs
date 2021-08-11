import IGame from "../models/productModel";

async function getTopProducts(count: number): Promise<IGame[]> {
  const result = await fetch(`/api/games/list?SortField=Rating&limit=${count}&ordertype=Desc`);
  const topProducts: Array<IGame> = await result.json();

  return topProducts;
}
export default getTopProducts;
