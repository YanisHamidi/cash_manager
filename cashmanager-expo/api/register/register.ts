import axios from "axios";

const BASEURL = `https://localhost:3000/users/create`;

export const Register = async (
  prenom: string,
  nom: string,
  email: string,
  psw: string,
) => {
  const dataToSend = {
    firstname: prenom,
    lastname: nom,
    email: email,
    password: psw,
  };

  try {
    const response = await axios.post(BASEURL, dataToSend);
    if (response.status === 201)
      alert("Veuillez confirmer votre compte par email svp");
    return response.status;
  } catch (error: any) {
    if (error.response.data.message) alert(error.response.data.message);
    else
    console.log(error)
  }
};
