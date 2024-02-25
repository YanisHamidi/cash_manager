import SignInForm from '../../../../components/Auth-form/SignIn';

const SignIn = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-[25%] flex flex-col items-center justify-center">
        <div className="flex">
          <h2 className="text-2xl">CashManager</h2>
          <h2 className="text-2xl font-bold text-blue-500">Shops</h2>
        </div>
        <p className="text-sm text-slate-400 font-light mb-2 py-3">
          Connectez-vous pour profiter de CashManagerShops afin de créer votre
          boutique.
        </p>
        <SignInForm />
        <p className="text-sm text-slate-400 font-light mb-2 py-3">
          Pas encore inscrit ?{' '}
          <a className="text-blue-500" href="/">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
