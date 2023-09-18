import classNames from 'classnames';

type ButtonProps = JSX.IntrinsicElements['button'];

const Solid = ({ className, ...props }: ButtonProps) => (
  <button
    type="button"
    className={classNames(
      'py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800',
      className,
    )}
    {...props}
  />
);

const Icon = ({ className, ...props }: ButtonProps) => (
  <button
    type="button"
    className={classNames(
      'inline-flex justify-center items-center w-[46px] h-[46px] rounded-full bg-blue-600 text-white',
      className,
    )}
    {...props}
  />
);

export const Button = {
  Solid,
  Icon,
};
