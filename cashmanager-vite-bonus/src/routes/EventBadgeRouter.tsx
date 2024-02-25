import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from '../views/unanuthenticated/connexion/sign-up/sign-up';
import SignIn from '../views/unanuthenticated/connexion/sign-in/sign-in';
import Dashboard from '../views/authenticated/dashboard/Dashboard';
import { ProtectedAuthenticatedRoute } from './ProtectedAuthenticatedRoute';
import { useGlobalState } from '../store/context/store.context';
import Shop from '../views/authenticated/shop/Shop';

const EventBadgeRoute = () => {
  const { authenticatedState } = useGlobalState();
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route
          element={
            <ProtectedAuthenticatedRoute email={authenticatedState.email} />
          }
        >
          <Route element={<Dashboard />} path="dashboard" />
          <Route element={<Shop />} path="shop" />
        </Route>
        {authenticatedState.email === '' && (
          <Route element={<Navigate to="/login" />} path="*" />
        )}
        {authenticatedState.email !== '' && (
          <Route element={<Navigate to="/dashboard" />} path="*" />
        )}
      </Routes>
    </>
  );
};

export default EventBadgeRoute;
