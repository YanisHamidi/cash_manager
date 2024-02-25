import axios from "axios";

const BASEURL = `https://localhost:3000/products/get-products-by-shop-id`;

export const getProducts = async (id: number) => {
  try {
    const response = await axios.get(`${BASEURL}?shopId=${id}`);
    if (response.status === 204) return null;
    else return response.data;
  } catch (error) {
    console.log(error);
  }
};
