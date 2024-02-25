import { ReactNode } from 'react';

type Properties = Readonly<{
  children: ReactNode;
}>;

const Unauthenticated = ({ children }: Properties) => (
  <div className="h-full">
    <div className="flex flex-col items-center justify-center">{children}</div>
  </div>
);

export default Unauthenticated;
