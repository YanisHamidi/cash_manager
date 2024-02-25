import { AuthenticatedState } from './authenticated.entities';

export enum AuthenticatedActions {
  INIT_AUTHENTICATED_APP = 'INIT_AUTHENTICATED_APP',
  UPDATE_USER_INFOS = 'UPDATE_USER_INFOS',
  UPDATE_AUTHENTICATED_STATE = 'UPDATE_AUTHENTICATED_STATE',
  RESET_AUTHENTICATED_STATE = 'RESET_AUTHENTICATED_STATE',
}

export type AuthenticatedPayload = Partial<AuthenticatedState>;

export const resetAuthenticatedState = (): AllAuthenticatedStateActions => ({
  type: AuthenticatedActions.RESET_AUTHENTICATED_STATE,
  payload: {
    userId: 0,
    email: '',
    firstname: '',
    lastname: '',
    role: undefined,
  },
});

export type AllAuthenticatedStateActions = Readonly<{
  type: AuthenticatedActions;
  payload?: AuthenticatedPayload;
}>;
