import { AuthenticatedState } from './authenticated.entities';

export const INITIAL_AUTHENTICATED_STATE: AuthenticatedState = {
  userId: 0,
  email: '',
  firstname: '',
  lastname: '',
  role: 'event-client',
};
