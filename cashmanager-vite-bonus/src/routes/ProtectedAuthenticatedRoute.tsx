import { Navigate, Outlet } from 'react-router-dom';
import Authenticated from '../components/Layout/Authenticated';

type Properties = Readonly<{
  email: string;
}>;

export const ProtectedAuthenticatedRoute = ({ email }: Properties) => {
  if (email === '') {
    return <Navigate replace to="/sign-in" />;
  }

  return (
    <Authenticated>
      <Outlet />
    </Authenticated>
  );
};
