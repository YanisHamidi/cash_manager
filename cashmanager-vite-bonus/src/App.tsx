import { useEffect } from 'react';
import EventBadgeRoute from './routes/EventBadgeRouter';
import { updateContextUserInfo } from './utils/auth/authUtils';
import { useGlobalState } from './store/context/store.context';
import { useLocation, useNavigate } from 'react-router-dom';

export default function App() {
  const { authenticatedDispatch } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('user-token');
  useEffect(() => {
    if (token) {
      updateContextUserInfo(
        token,
        authenticatedDispatch,
        navigate,
        location,
      ).catch((error) => console.error(error));
    }
  }, [authenticatedDispatch, navigate, location, token]);
  return <EventBadgeRoute />;
}
