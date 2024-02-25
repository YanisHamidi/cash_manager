import axios, { AxiosResponse } from 'axios';
import { RestShop } from './entities';

const getInfosByShopId = async (
  shopId: string | null,
): Promise<RestShop | null> => {
  try {
    const result: AxiosResponse<RestShop> = await axios.get<RestShop>(
      `https://localhost:3000/shops/get-infos-by-shopId/${shopId}`,
    );

    if (result.status === 200) {
      return result.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la requête API :', error);
    return null;
  }
};

export { getInfosByShopId };
