import { Icon } from '@components/Icon';

export const Sidebar = ({
  id = 'sidebar',
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) => (
  <div
    id={id}
    className="hs-overlay hidden hs-overlay-open:-translate-x-64 translate-x-full transition-all duration-300 transform fixed top-0 -right-64 bottom-0 z-[60] w-64 bg-white pt-2 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:left-auto lg:bottom-0 border-l-2"
  >
    <button
      type="button"
      className="w-8 h-8"
      data-hs-overlay={`#${id}`}
      aria-controls={id}
    >
      <Icon.X />
    </button>
    <div className="px-3 mt-20">{children}</div>
  </div>
);
