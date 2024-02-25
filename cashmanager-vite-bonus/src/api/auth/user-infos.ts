import axios from 'axios';
import { RestGetUserInfos } from './entities';

const getUserInfos = async (token: string): Promise<RestGetUserInfos> => {
  try {
    const result = await axios.get(
      `https://localhost:3000/users/get-infos-by-userid?token=${token}`,
    );
    if (result.status === 200) return result.data as RestGetUserInfos;
  } catch (error: unknown) {
    if (error.status === 401) localStorage.removeItem('user-token');
    if (error.response.data.message) alert(error.response.data.message);
  }
  throw new Error('Une erreur est survenue lors de la connexion');
};

export { getUserInfos };
