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
      return {
        user: {
          id: 0,
          firstname: "",
          lastname: "",
          email: "",
          products: [],
        },
        ...action.payload,
      };
    case "addToCart":
      return { ...user, products: [...user.products, action.payload] };
    case "removeFromCart":
      const updatedProducts = user.products.filter(
        (product: { id: React.Key | null | undefined }) =>
          product.id !== action.payload.productId
      );
      return { ...user, products: updatedProducts };
    case "paymentComplete":
      return {...user, products: []}
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

const initialUser = {
  id: 0,
  firstname: "",
  lastname: "",
  email: "",
  products: [],
};
