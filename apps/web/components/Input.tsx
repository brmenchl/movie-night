import classNames from 'classnames';
import React from 'react';

type InputProps = JSX.IntrinsicElements['input'];

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      type="text"
      className={classNames(
        'py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

export const InputWithAddon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, children, ...props }, ref) => (
    <div className="flex rounded-md">
      <input
        type="text"
        ref={ref}
        className={classNames(
          'py-3 px-4 block w-full border-gray-200 rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400',
          className,
        )}
        {...props}
      />
      <div className="inline-flex flex-shrink-0 justify-center items-center h-[2.875rem] w-[2.875rem] rounded-r-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
        {children}
      </div>
    </div>
  ),
);
