import { Icon } from '@components/Icon';

export const Sidebar = ({
  id = 'sidebar',
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => (
  <div
    id={id}
    className="hs-overlay hs-overlay-open:translate-x-0 translate-x-full transition-all duration-300 transform hidden fixed top-0 right-0 bottom-0 z-[60] w-64 bg-white pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:left-auto lg:bottom-0 border-l-2"
  >
    <button type="button" className="w-8 h-8" data-hs-overlay={`#${id}`}>
      <Icon.X />
    </button>
    <div className="px-3 mt-20">{children}</div>
  </div>
);
