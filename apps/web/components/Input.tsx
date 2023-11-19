import classNames from 'classnames';
import React, { type ReactNode } from 'react';

type InputProps = JSX.IntrinsicElements['input'];

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      type="text"
      className={classNames(
        'py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

export const InputWithAddon = React.forwardRef<
  HTMLInputElement,
  InputProps & { subText?: ReactNode }
>(({ className, children, subText, ...props }, ref) => (
  <div className="flex rounded-md">
    <div className="flex flex-col rounded-l-md border-2 border-gray-200 items-stretch">
      <input
        type="text"
        ref={ref}
        className={classNames(
          'py-3 px-4 block h-12 w-full border-0 text-sm focus:border-blue-500 focus:ring-blue-500',
          subText ? 'rounded-tl-md' : 'rounded-l-md',
          className,
        )}
        {...props}
      />
      {subText}
    </div>
    <div className="flex flex-shrink-0 justify-center items-center w-8 rounded-r-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
      {children}
    </div>
  </div>
));
