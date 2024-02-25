import { Navigate, Outlet } from 'react-router-dom';
import { useGlobalState } from '../store/context/store.context';
import Unauthenticated from '../components/Layout/Unauthenticated';

export const ProtectedUnauthenticatedRoute = () => {
  const { authenticatedState } = useGlobalState();

  if (authenticatedState.email === '') {
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <Unauthenticated>
      <Outlet />
    </Unauthenticated>
  );
};
