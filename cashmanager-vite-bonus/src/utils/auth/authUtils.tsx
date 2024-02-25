import { Dispatch } from 'react';
import { getUserInfos } from '../../api/auth/user-infos';
import {
  AllAuthenticatedStateActions,
  AuthenticatedActions,
  resetAuthenticatedState,
} from '../../store/authenticated/authenticated.action';
import { Location, NavigateFunction } from 'react-router-dom';

const disconnectUser = async (
  authenticatedDispatch: Dispatch<AllAuthenticatedStateActions>,
  navigate: NavigateFunction,
) => {
  localStorage.clear();
  authenticatedDispatch(resetAuthenticatedState());
  navigate('/');
};

const updateContextUserInfo = async (
  token: string,
  authenticatedDispatch: Dispatch<AllAuthenticatedStateActions>,
  navigate: NavigateFunction,
  location: Location<string>,
) => {
  if (token) {
    try {
      const result = await getUserInfos(token);
      authenticatedDispatch({
        payload: {
          userId: result.userId,
          email: result.email,
          firstname: result.firstname,
          lastname: result.lastname,
        },
        type: AuthenticatedActions.INIT_AUTHENTICATED_APP,
      });
      if (location.pathname === '/sign-in' || location.pathname === '/sign-up')
        navigate('/dashboard');
    } catch (error: unknown) {
      localStorage.removeItem('user-token');
      throw new Error('Une erreur est survenue lors de la connexion');
    }
  }
};

export { updateContextUserInfo, disconnectUser };
