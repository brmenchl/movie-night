export const Sidebar = ({
  id = 'sidebar',
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) => (
  <div
    id={id}
    className="hs-overlay hidden hs-overlay-open:-translate-x-64 translate-x-full transition-all duration-300 transform fixed top-0 -right-64 bottom-0 z-[60] w-64 bg-white pt-2 pb-10 overflow-y-auto overflow-x-hidden border-l-2 hs-overlay-backdrop-open:bg-transparent"
  >
    <div className="px-6">{children}</div>
  </div>
);
