import IGame from "./productModel";

async function getTopProducts(count: number): Promise<IGame[]> {
  const result = await fetch(`http://localhost:8000/api/games/list?SortField=Rating&limit=${count}&ordertype=Desc`);
  const topProducts: Array<IGame> = await result.json();

  return topProducts;
}
export default getTopProducts;
