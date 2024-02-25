import { useState } from 'react';
import { createUserAccount } from '../../api/auth/sign-up';

const SignUpForm = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUserAccount(email, prenom, nom, motDePasse);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] text-sm font-light flex flex-col items-center"
    >
      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        className="w-full border-slate-200 border-[1px] rounded-lg px-2 py-1 mb-2"
      />
      <input
        type="text"
        placeholder="Prénom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        className="w-full border-slate-200 border-[1px] rounded-lg px-2 py-1 mb-2"
      />
      <input
        type="text"
        placeholder="Hello@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border-slate-200 border-[1px] rounded-lg px-2 py-1 mb-2"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
        className="w-full border-slate-200 border-[1px] rounded-lg px-2 py-1 mb-6"
      />
      <button
        type="submit"
        className="py-2 w-full bg-black hover:bg-blue-500 rounded-xl font-medium text-white"
      >
        Créer un compte
      </button>
    </form>
  );
};

export default SignUpForm;
