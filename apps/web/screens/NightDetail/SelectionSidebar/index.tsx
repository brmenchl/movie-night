import { MovieForm } from './MovieForm';
import { MovieList } from './MovieList';
import { Sidebar } from './Sidebar';
import { NightHeader } from './NightHeader';
import { MenuIcon } from 'lucide-react';

export const SelectionSidebar = () => (
  <>
    <button
      className="absolute top-2 right-2 h-8 w-8"
      data-hs-overlay="#movie-selection-sidebar"
      aria-controls="movie-selection-sidebar"
    >
      <MenuIcon />
    </button>
    <Sidebar id="movie-selection-sidebar">
      <NightHeader />
      <MovieForm />
      <div className="h-1 mt-2 mb-6 bg-gray-200" />
      <MovieList />
    </Sidebar>
  </>
);
