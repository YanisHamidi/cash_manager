import axios from 'axios';
import { RestUserInfos } from './entities';

const loginUserAccount = async (
  email: string,
  password: string,
): Promise<RestUserInfos> => {
  try {
    const result = await axios.post(
      `https://localhost:3000/users/login`,
      {
        email: email,
        password: password,
      },
    );
    if (result.status === 200) return result.data as RestUserInfos;
  } catch (error: unknown) {
    if (error.status === 409) alert('Utilisateur déjà existant');
    if (error.response.data.message) alert(error.response.data.message);
  }
  throw new Error('Une erreur est survenue lors de la connexion');
};

export { loginUserAccount };
