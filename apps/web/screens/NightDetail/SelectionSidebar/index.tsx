import { MovieForm } from './MovieForm';
import { MovieList } from './MovieList';
import { Sidebar } from './Sidebar';

export const SelectionSidebar = () => (
  <Sidebar>
    <div>
      <MovieForm />
      <div className="h-1 mt-2 mb-6 bg-gray-200" />
      <MovieList />
    </div>
  </Sidebar>
);
