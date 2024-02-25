import axios from 'axios';

const deleteShopById = async (shopId: number): Promise<200 | void> => {
  try {
    const result = await axios.delete(
      `https://localhost:3000/shops/delete-shop/${shopId}`,
    );
    if (result.status === 200) {
      return 200;
    }
    console.error('Une erreur est survenue');
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
  }
};

export { deleteShopById };
