import axios, { AxiosResponse } from 'axios';
import { RestCreateProducts, RestProducts } from './entities';

const createProductByShopId = async (
  shopId: string | null,
  name: string,
  description: string,
  image: string,
  price: string,
): Promise<RestProducts | null> => {
  try {
    const data = {
      shopId: shopId,
      name: name,
      description: description,
      image: image,
      price: parseInt(price),
    };

    const result: AxiosResponse<RestCreateProducts> =
      await axios.post<RestCreateProducts>(
        `https://localhost:3000/products/create`,
        data,
      );

    if (result.status === 201) {
      return result.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la requête API :', error);
    return null;
  }
};

export { createProductByShopId };
