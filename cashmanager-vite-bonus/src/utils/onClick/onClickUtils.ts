import { Dispatch, MouseEventHandler } from 'react';
import { NavigateFunction } from 'react-router-dom';
import {
  AllAuthenticatedStateActions,
  resetAuthenticatedState,
} from '../../store/authenticated/authenticated.action';
import { deleteShopById } from '../../api/shops/delete-shop';

const onNavigateButtonClick =
  (navigate: NavigateFunction): MouseEventHandler<HTMLButtonElement> =>
  (event) => {
    const path = event.currentTarget.value;

    navigate(path);
  };
const onDeconnectNavigateButtonClick =
  (
    navigate: NavigateFunction,
    authenticatedDispatch: Dispatch<AllAuthenticatedStateActions>,
  ): MouseEventHandler<HTMLButtonElement> =>
  (event) => {
    authenticatedDispatch(resetAuthenticatedState());
    localStorage.clear();
    event;
    navigate('/');
  };

const onStateButtonClick =
  (
    state: boolean,
    setState: Dispatch<boolean>,
  ): MouseEventHandler<HTMLButtonElement> =>
  (event) => {
    if (event) {
      setState(!state);
    }
  };

const onDeleteButtonClick =
  (
    shopId: number,
    shops: ReadonlyArray<{
      id: number;
      name: string;
      address: string;
      longitude: string;
      latitude: string;
      image: string;
    }>,
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
  ): MouseEventHandler<HTMLButtonElement> =>
  async (event) => {
    event;
    const result = await deleteShopById(shopId);
    if (result === 200) {
      const updatedShops = shops.filter((shop) => shop.id !== shopId);
      setShops(updatedShops);
    }
  };

export {
  onNavigateButtonClick,
  onDeconnectNavigateButtonClick,
  onStateButtonClick,
  onDeleteButtonClick,
};
