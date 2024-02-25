import {
  AllAuthenticatedStateActions,
  AuthenticatedActions,
} from './authenticated.action';
import { AuthenticatedState } from './authenticated.entities';
import { INITIAL_AUTHENTICATED_STATE } from './authenticated.state';

const authenticatedReducer = (
  state: AuthenticatedState,
  action: AllAuthenticatedStateActions,
): AuthenticatedState => {
  const { type, payload } = action;

  switch (type) {
    case AuthenticatedActions.INIT_AUTHENTICATED_APP: {
      return {
        ...state,
        ...payload,
      };
    }

    case AuthenticatedActions.UPDATE_USER_INFOS: {
      return { ...state, ...payload };
    }

    case AuthenticatedActions.RESET_AUTHENTICATED_STATE:
      return { ...INITIAL_AUTHENTICATED_STATE };

    default: {
      return state;
    }
  }
};

export { authenticatedReducer };
