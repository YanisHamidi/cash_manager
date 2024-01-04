import axios from "axios";

const BASEURL = `https://cashmanager-dae095f59b0d.herokuapp.com/shops/get-shops`;

export const getShops = async (latitude: number, longitude: number) => {
  const dataToSend = {
    latitude: latitude,
    longitude: longitude,
  };

  try {
    const response = await axios.get(BASEURL, {
      params: dataToSend,
    });
    console.log(response);
    if (response.status === 204) {
      alert("Aucune boutique ne se situe autour de vous");
      return null;
    } else return response;
  } catch (error) {
    console.log(error);
  }
};
