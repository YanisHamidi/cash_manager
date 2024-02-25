import { authenticatedReducer } from '../authenticated/authenticated.reducer';
import { ReactNode, useMemo, useReducer } from 'react';
import { INITIAL_AUTHENTICATED_STATE } from '../authenticated/authenticated.state';
import { StoreContext } from './store.context';

type Properties = Readonly<{
  children: ReactNode;
}>;

const StoreProvider = ({ children }: Properties) => {
  const [authenticatedState, authenticatedDispatch] = useReducer(
    authenticatedReducer,
    INITIAL_AUTHENTICATED_STATE,
  );

  const value = useMemo(
    () => ({
      authenticatedDispatch,
      authenticatedState,
    }),
    [authenticatedState],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
