import axios from "axios";
// Localstorage
import * as SecureStore from "expo-secure-store";

const BASEURL = `https://cashmanager-dae095f59b0d.herokuapp.com/users/login`;

export const Login = async (
  email: string,
  psw: string,
  dispatch: React.Dispatch<any>
) => {
  const dataToSend = {
    email: email,
    password: psw,
  };

  try {
    const response = await axios.post(BASEURL, dataToSend);
    if (response.status == 204) alert("Le compte n'existe pas");
    else {
      await SecureStore.setItemAsync("auth_token", response.data.token);
      dispatch({
        type: "initUser",
        payload: {
          id: response.data.userId,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
