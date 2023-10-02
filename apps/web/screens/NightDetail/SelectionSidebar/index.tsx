import { MovieForm } from './MovieForm';
import { MovieList } from './MovieList';
import { Sidebar } from './Sidebar';

export const SelectionSidebar = () => (
  <Sidebar>
    <div>
      <MovieForm />
      <MovieList />
    </div>
  </Sidebar>
);
