import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../store/context/store.context';
import { onDeconnectNavigateButtonClick } from '../../utils/onClick/onClickUtils';

const Header = () => {
  const { authenticatedDispatch } = useGlobalState();
  const navigate = useNavigate();
  const handleDeconnectNavButtonClick = onDeconnectNavigateButtonClick(
    navigate,
    authenticatedDispatch,
  );
  return (
    <header className="flex w-full py-4 bg-white drop-shadow-[0_20px_15px_rgba(0,0,0,0.05)]">
      <div className="flex w-1/4 items-center justify-start">
        <h2 className="text-xl ml-6">CashManager</h2>
        <h2 className="text-xl font-bold text-blue-500">Shops</h2>
      </div>
      <div className="w-3/4 items-center flex justify-end pr-10">
        <button onClick={handleDeconnectNavButtonClick}>Disconnect</button>
      </div>
    </header>
  );
};

export default Header;
