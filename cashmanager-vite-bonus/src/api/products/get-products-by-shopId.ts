import axios, { AxiosResponse } from 'axios';
import { RestProducts } from './entities';

const getProductsByShopId = async (
  shopId: string | null,
): Promise<RestProducts[] | []> => {
  try {
    const result: AxiosResponse<RestProducts[]> = await axios.get<
      RestProducts[]
    >(
      `https://localhost:3000/products/get-products-by-shop-id?shopId=${shopId}`,
    );

    if (result.status === 200) {
      return result.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la requête API :', error);
    return [];
  }
};

export { getProductsByShopId };
