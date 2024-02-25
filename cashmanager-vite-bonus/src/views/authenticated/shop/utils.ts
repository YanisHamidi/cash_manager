import { MouseEventHandler } from 'react';
import { deleteProductByProductId } from '../../../api/products/delete-product-by-productId';
import { RestProducts } from '../../../api/products/entities';

const onDeleteButtonClick =
  (
    productId: number,
    products: RestProducts[],
    setProducts: React.Dispatch<React.SetStateAction<RestProducts[]>>,
  ): MouseEventHandler<HTMLButtonElement> =>
  async (event) => {
    event;
    const result = await deleteProductByProductId(productId);
    if (result === 200) {
      const updatedProducts = products.filter(
        (product) => product.id !== productId,
      );
      setProducts(updatedProducts);
    }
  };

export { onDeleteButtonClick };
