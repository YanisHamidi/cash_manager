import { createContext, Dispatch, useContext } from 'react';
import { AuthenticatedState } from '../authenticated/authenticated.entities';
import { AllAuthenticatedStateActions } from '../authenticated/authenticated.action';
import { INITIAL_AUTHENTICATED_STATE } from '../authenticated/authenticated.state';

export type StoreContext = Readonly<{
  authenticatedState: AuthenticatedState;
  authenticatedDispatch: Dispatch<AllAuthenticatedStateActions>;
}>;

export const StoreContext = createContext<StoreContext>({
  authenticatedDispatch: () => {},
  authenticatedState: INITIAL_AUTHENTICATED_STATE,
});

const useGlobalState = () => useContext(StoreContext);

export { useGlobalState };
