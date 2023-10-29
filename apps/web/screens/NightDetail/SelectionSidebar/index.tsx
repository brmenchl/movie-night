import { Icon } from '@components/Icon';
import { MovieForm } from './MovieForm';
import { MovieList } from './MovieList';
import { Sidebar } from './Sidebar';
import { NightHeader } from './NightHeader';

export const SelectionSidebar = () => (
  <>
    <button
      className="absolute top-2 right-2 h-8 w-8"
      data-hs-overlay="#sidebar"
      aria-controls="sidebar"
    >
      <Icon.HamburgerMenu />
    </button>
    <Sidebar>
      <NightHeader />
      <MovieForm />
      <div className="h-1 mt-2 mb-6 bg-gray-200" />
      <MovieList />
    </Sidebar>
  </>
);
