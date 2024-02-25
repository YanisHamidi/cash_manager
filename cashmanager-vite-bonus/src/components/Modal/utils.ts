import { createProductByShopId } from '../../api/products/create-product';
import { RestProducts } from '../../api/products/entities';
import { createShop } from '../../api/shops/create-shop';
import { getCoordinatesByAddress } from '../../api/shops/get-coordinate-by-address';

const onSubmitForm =
  (
    userId: number,
    setState: React.Dispatch<boolean>,
    setShops: React.Dispatch<
      React.SetStateAction<
        readonly {
          id: number;
          name: string;
          address: string;
          longitude: string;
          latitude: string;
          image: string;
        }[]
      >
    >,
  ): React.FormEventHandler<HTMLFormElement> =>
  async (event) => {
    event.preventDefault();
    const address = encodeURIComponent(event.target[1].value).replace(
      /%20/g,
      '+',
    );

    const coordinates = await getCoordinatesByAddress(address);
    const result = await createShop(
      userId,
      event.target[0].value,
      coordinates[1],
      coordinates[0],
      event.target[2].value,
      event.target[1].value,
    );

    console.log(result);

    if (result) {
      setShops((prevShops) => [...prevShops, result]);
    }
    event.target.reset();
    setState(false);
  };

const onSubmitFormProducts =
  (
    shopId: string | null,
    setState: React.Dispatch<boolean>,
    setProducts: React.Dispatch<React.SetStateAction<RestProducts[]>>,
  ): React.FormEventHandler<HTMLFormElement> =>
  async (event) => {
    event.preventDefault();
    const result = await createProductByShopId(
      shopId,
      event.target[0].value,
      event.target[1].value,
      event.target[2].value,
      event.target[3].value,
    );

    if (result) {
      console.log('lol');
      setProducts((prevProducts) => [...prevProducts, result]);
    }

    event.target.reset();
    setState(false);
  };

export { onSubmitForm, onSubmitFormProducts };
