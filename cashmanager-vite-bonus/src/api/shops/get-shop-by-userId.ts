import axios, { AxiosResponse } from 'axios';
import { RestShop } from './entities';

const getShopsByUserId = async (userId: number): Promise<RestShop[] | []> => {
  try {
    const result: AxiosResponse<RestShop[]> = await axios.get<RestShop[]>(
      `https://localhost:3000/shops/get-shops/${userId}`,
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

export { getShopsByUserId };
