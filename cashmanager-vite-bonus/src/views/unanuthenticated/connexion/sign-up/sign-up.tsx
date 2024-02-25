import SignUpForm from '../../../../components/Auth-form/SignUp';

const SignUp = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-[25%] flex flex-col items-center justify-center">
        <div className="flex">
          <h2 className="text-2xl">CashManager</h2>
          <h2 className="text-2xl font-bold text-blue-500">Shops</h2>
        </div>
        <p className="text-sm text-slate-400 font-light mb-2 py-3">
          Créer votre compte pour créer votre boutique et la gérer dès
          maintenant !
        </p>
        <SignUpForm />
        <p className="text-sm text-slate-400 font-light mb-2 py-3">
          Vous avez déjà un compte ?{' '}
          <a className="text-blue-500" href="/sign-in">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
