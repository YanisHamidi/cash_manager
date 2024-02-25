import axios from 'axios';

const deleteProductByProductId = async (productId: number) => {
  try {
    const result = await axios.delete(
      `https://localhost:3000/products/delete-product/${productId}`,
    );
    if (result.status === 200) {
      return 200;
    }
    console.error('Une erreur est survenue');
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
  }
};

export { deleteProductByProductId };
