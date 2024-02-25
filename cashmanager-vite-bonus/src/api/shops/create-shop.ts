import axios from 'axios';
import { RestCreateShop, RestShop } from './entities';

const createShop = async (
  userId: number,
  name: string,
  lat: number,
  long: number,
  image: string,
  address: string,
): Promise<RestShop | null> => {
  try {
    const data = {
      userId: userId,
      address: address,
      name: name,
      latitude: lat,
      longitude: long,
      image: image,
    };

    const result = await axios.post<RestCreateShop>(
      'https://localhost:3000/shops/create',
      data,
    );
    if (result.status === 201)
      return {
        address: result.data.address,
        id: result.data.id,
        image: result.data.image,
        latitude: result.data.latitude,
        longitude: result.data.longitude,
        name: result.data.name,
      };
    return null;
  } catch (error) {
    console.error('Erreur lors de la requête API :', error);
    return null;
  }
};

export { createShop };
