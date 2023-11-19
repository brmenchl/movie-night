import classNames from 'classnames';

export const Select = ({
  className,
  ...props
}: JSX.IntrinsicElements['select']) => (
  <select
    className={classNames(
      'py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500',
      className,
    )}
    {...props}
  />
);
