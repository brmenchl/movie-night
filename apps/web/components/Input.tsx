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