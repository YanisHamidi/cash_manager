import { useEffect, useState } from 'react';
import { getShopsByUserId } from '../../../api/shops/get-shop-by-userId';
import { useGlobalState } from '../../../store/context/store.context';
import Modal from '../../../components/Modal/Modal';
import {
  onDeleteButtonClick,
  onNavigateButtonClick,
  onStateButtonClick,
} from '../../../utils/onClick/onClickUtils';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { authenticatedState } = useGlobalState();
  const [modalState, setModalState] = useState<boolean>(false);
  const handleNavigationButtonClick = onNavigateButtonClick(navigate);
  const handleStateClick = onStateButtonClick(modalState, setModalState);
  const [shops, setShops] = useState<
    ReadonlyArray<{
      id: number;
      name: string;
      address: string;
      longitude: string;
      latitude: string;
      image: string;
    }>
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopsData = await getShopsByUserId(authenticatedState.userId);
        if (shopsData) {
          setShops(shopsData);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des magasins :', error);
      }
    };

    fetchData();
  }, [authenticatedState.userId]);

  return (
    <div className="w-1/3 min-h-[80vh]">
      <Modal state={modalState} setState={setModalState} setShops={setShops} />
      <h1 className="mb-4">Bienvenue {authenticatedState.lastname}</h1>
      <p className="font-light mb-4">
        Ici retrouver tout vos shops, vous pouvez egalement en créer de nouveaux
        ou en supprimer.
      </p>
      <div className="w-full flex justify-center mb-4">
        <button
          onClick={handleStateClick}
          className="py-2 w-3/4 bg-black hover:bg-blue-500 rounded-xl font-medium text-white text-sm"
        >
          Create Shop
        </button>
      </div>
      <div>
        {shops.map((shop) => (
          <div key={shop.id} className="mb-4 bg-slate-200 pb-4 rounded-lg">
            <button
              className="w-full"
              onClick={handleNavigationButtonClick}
              value={`/shop?id=${shop.id}`}
            >
              <div
                style={{ backgroundImage: `url(${shop.image})` }}
                className="h-[15vh] w-full bg-cover bg-center mb-2 rounded-t-lg"
              ></div>
            </button>
            <div className="px-4">
              <h2 className="font-medium">{shop.name}</h2>
              <span>{shop.address}</span>
              <div className="w-full flex justify-center mt-4">
                <button
                  onClick={onDeleteButtonClick(shop.id, shops, setShops)}
                  className="py-2 w-2/3 bg-gray-500 hover:bg-red-500 rounded-xl font-medium text-white text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
