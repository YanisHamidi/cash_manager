import { ReactNode, createContext, useContext, useReducer } from "react";

export const Context = createContext<any>(null);
export const Dispatch = createContext<React.Dispatch<any>>(() => {});

interface Props {
  children: ReactNode;
}

export function Provider({ children }: Props) {
  const [user, dispatch] = useReducer(usersReducer, initialUser);

  return (
    <Context.Provider value={user}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  );
}

export function useUser() {
  return useContext(Context);
}

export function useUserDispatch() {
  return useContext(Dispatch);
}

function usersReducer(
  user: any,
  action: {
    type: string;
    payload?: any;
  }
) {
  switch (action.type) {
    case "initUser":
      return { ...user, ...action.payload };
    case "updateUser":
      return { ...user, ...action.payload };
    case "clearUser":
      return null;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

const initialUser = { id: 0, firstname: "", lastname: "", email: "" };
