import { useGlobalState } from '../../store/context/store.context';
import { onStateButtonClick } from '../../utils/onClick/onClickUtils';
import { onSubmitForm } from './utils';

type Properties = Readonly<{
  state: boolean;
  setState: React.Dispatch<boolean>;
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
  >;
}>;

const Modal = ({ state, setState, setShops }: Properties) => {
  const { authenticatedState } = useGlobalState();
  const handleStateClick = onStateButtonClick(state, setState);
  const handleSubmitForm = onSubmitForm(
    authenticatedState.userId,
    setState,
    setShops,
  );
  return (
    <div
      className={
        state ? 'absolute w-1/3 left-30 bg-white rounded-lg' : 'hidden'
      }
    >
      <div className="py-6 px-4 flex flex-col justify-center items-center">
        <div className="flex justify-end w-full">
          <button onClick={handleStateClick}>X</button>
        </div>
        <h2 className="mb-6">Créer votre shop</h2>
        <form
          onSubmit={handleSubmitForm}
          className="w-[90%] text-sm font-light flex flex-col items-center"
        >
          <input
            type="text"
            placeholder="Nom"
            className="w-full border-slate-200 border-[1px] rounded-lg px-2 py-1 mb-2"
          />
          <input
            type="text"
            placeholder="Adresse"
            className="w-full border-slate-200 border-[1px] rounded-lg px-2 py-1 mb-2"
          />
          <input
            type="text"
            placeholder="Image"
            className="w-full border-slate-200 border-[1px] rounded-lg px-2 py-1 mb-6"
          />
          <button
            type="submit"
            className="py-2 w-full bg-black hover:bg-blue-500 rounded-xl font-medium text-white"
          >
            Créer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
