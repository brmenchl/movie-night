import { type ReactNode } from 'react';

export const Modal = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  return (
    <div
      id={id}
      className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
    >
      <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        {children}
      </div>
    </div>
  );
};
