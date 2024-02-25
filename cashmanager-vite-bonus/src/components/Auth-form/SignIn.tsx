import { useGlobalState } from '../../store/context/store.context';
import { useNavigate } from 'react-router-dom';
import { onSubmitForm } from './utils';

const SignInForm = () => {
  const { authenticatedDispatch } = useGlobalState();
  const navigate = useNavigate();
  const handleSubmitForm = onSubmitForm(navigate, authenticatedDispatch);

  return (
    <form
      onSubmit={handleSubmitForm}
      className="w-[90%] text-sm font-light flex flex-col items-center"
    >
      <input
        type="email"
        placeholder="Hello@gmail.com"
        className="w-full border-slate-200 border-[1px] rounded-lg px-2 py-1 mb-2"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="w-full border-slate-200 border-[1px] rounded-lg px-2 py-1 mb-6"
      />
      <button
        type="submit"
        className="py-2 w-full bg-black hover:bg-blue-500 rounded-xl font-medium text-white"
      >
        Se connecter
      </button>
    </form>
  );
};

export default SignInForm;
