export const Sidebar = ({
  id = 'sidebar',
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) => (
  <div
    id={id}
    className="hs-overlay hs-overlay-open:translate-x-0 translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-s dark:bg-gray-800 dark:border-gray-700 hidden pb-6 pt-8 overflow-y-auto overflow-x-hidden"
  >
    <div className="px-6">{children}</div>
  </div>
);
