import axios from 'axios';

const createUserAccount = async (
  email: string,
  firstname: string,
  lastname: string,
  password: string,
): Promise<void> => {
  try {
    const result = await axios.post(
      `https://localhost:3000/users/create`,
      {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password,
      },
    );
    if (result.status === 201) alert('carré');
  } catch (error: unknown) {
    if (error.status === 409) alert('Utilisateur déjà existant');
    if (error.response.data.message) alert(error.response.data.message);
  }
};

export { createUserAccount };
