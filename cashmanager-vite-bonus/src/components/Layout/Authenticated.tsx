import { ReactNode } from 'react';
import Header from '../Header/Header';

type Properties = Readonly<{
  children: ReactNode;
}>;

const Authenticated = ({ children }: Properties) => {
  return (
    <>
      <div className="flex h-full flex-col">
        <Header />
        <div className="relative flex h-full flex-col overflow-y-auto pt-10 items-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default Authenticated;
