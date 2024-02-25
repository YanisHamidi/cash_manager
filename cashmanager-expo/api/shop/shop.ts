import axios from "axios";

const BASEURL = `https://localhost:3000/shops/get-shops`;

export const getShops = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get(
      `${BASEURL}?lat=${latitude}&long=${longitude}`
    );
    if (response.status === 204) return null;
    else return response.data;
  } catch (error) {
    console.log(error);
  }
};
