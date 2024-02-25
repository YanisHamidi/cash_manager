import axios from "axios";

const BASEURL = `https://localhost:3000/users/update-user-infos-by-userid`;

export const Update = async (
  id: number,
  prenom: string,
  nom: string,
  email: string,
  psw: string,
  dispatch: React.Dispatch<any>
) => {
  let dataToSend = {};

  if (psw === "") {
    dataToSend = {
      userId: id,
      firstname: prenom,
      lastname: nom,
      email: email,
    };
  } else {
    dataToSend = {
      userId: id,
      firstname: prenom,
      lastname: nom,
      email: email,
      password: psw,
    };
  }

  try {
    const response = await axios.put(BASEURL, dataToSend);
    alert("Vos informations ont été modifiées !");
    dispatch({
      type: "initUser",
      payload: {
        id: response.data.userId,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        email: response.data.email,
      },
    });
    return response;
  } catch (error: unknown) {
    console.log(error);
  }
};
