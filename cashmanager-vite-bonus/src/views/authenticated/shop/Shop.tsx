import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getInfosByShopId } from '../../../api/shops/get-infos-by-shopId';
import {
  onNavigateButtonClick,
  onStateButtonClick,
} from '../../../utils/onClick/onClickUtils';
import { RestProducts } from '../../../api/products/entities';
import { getProductsByShopId } from '../../../api/products/get-products-by-shopId';
import ModalProducts from '../../../components/Modal/ModalProducts';
import { onDeleteButtonClick } from './utils';

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavigationButtonClick = onNavigateButtonClick(navigate);
  const [modalState, setModalState] = useState<boolean>(false);
  const handleStateClick = onStateButtonClick(modalState, setModalState);
  const queryParams = new URLSearchParams(location.search);
  const shopId = queryParams.get('id');
  const [shop, setShop] = useState<
    Readonly<{
      id: number;
      name: string;
      address: string;
      longitude: string;
      latitude: string;
      image: string;
    }>
  >();
  const [products, setProducts] = useState<RestProducts[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopData = await getInfosByShopId(shopId);
        if (shopData) setShop(shopData);

        if (shopId) {
          const productsData = await getProductsByShopId(shopId);
          if (productsData) setProducts(productsData);
        }
      } catch (error) {
        console.error(
          'Erreur lors du chargement des informations de la boutique :',
          error,
        );
      }
    };

    if (shopId) {
      fetchData();
    }
  }, [shopId]);

  if (!shop) {
    return null;
  }

  return (
    <div className="w-1/3 min-h-[80vh]">
      <ModalProducts
        state={modalState}
        setState={setModalState}
        setProducts={setProducts}
        shopId={shopId}
      />
      <div className="flex justify-between mb-4">
        <button
          className="bg-slate-200 rounded-lg py-2 px-4"
          value="/dashboard"
          onClick={handleNavigationButtonClick}
        >
          Retour
        </button>
        <button
          onClick={handleStateClick}
          className="bg-slate-200 rounded-lg py-2 px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </div>
      <div
        style={{ backgroundImage: `url(${shop.image})` }}
        className="h-[20vh] w-full bg-cover bg-center rounded-t-lg mb-4"
      ></div>
      <h1>{shop.name}</h1>
      <h2 className="mb-4">{shop.address}</h2>
      <div className="flex flex-wrap justify-between">
        {products &&
          products.map((product) => (
            <div
              className="w-[49%] mb-2 bg-slate-200 rounded-xl"
              key={product.id}
            >
              {product.image && (
                <div
                  style={{ backgroundImage: `url(${product.image})` }}
                  className="rounded-t-xl h-20 w-full bg-cover bg-center mb-2"
                ></div>
              )}
              <div className="px-4 pb-2">
                <h2>{product.name}</h2>
                <span className="font-light">{product.description}</span>
                <br />
                <div className="flex w-full justify-between mt-2">
                  <span className="font-medium">{product.price}€</span>
                  <button
                    onClick={onDeleteButtonClick(
                      product.id,
                      products,
                      setProducts,
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-trash"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shop;
