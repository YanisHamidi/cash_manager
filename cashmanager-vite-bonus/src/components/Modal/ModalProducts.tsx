import { RestProducts } from '../../api/products/entities';
import { onStateButtonClick } from '../../utils/onClick/onClickUtils';
import { onSubmitFormProducts } from './utils';

type Properties = Readonly<{
  state: boolean;
  setState: React.Dispatch<boolean>;
  setProducts: React.Dispatch<React.SetStateAction<RestProducts[]>>;
  shopId: string | null;
}>;

const ModalProducts = ({
  state,
  setState,
  setProducts,
  shopId,
}: Properties) => {
  const handleStateClick = onStateButtonClick(state, setState);
  const handleSubmitForm = onSubmitFormProducts(shopId, setState, setProducts);
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
        <h2 className="mb-6">Ajouter un produit</h2>
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
            placeholder="Description"
            className="w-full border-slate-200 border-[1px] rounded-lg px-2 py-1 mb-2"
          />
          <input
            type="text"
            placeholder="Image"
            className="w-full border-slate-200 border-[1px] rounded-lg px-2 py-1 mb-2"
          />
          <input
            type="number"
            placeholder="Prix"
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

export default ModalProducts;
