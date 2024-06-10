import { useMovieSelections } from '@/packages/movies';

import { MovieSelectionCell } from './MovieListItem';
import { useNightId } from '@/packages/nights';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export const MovieList = () => {
  const nightId = useNightId();
  const movieSelections = useMovieSelections(nightId);
  return (
    <Table>
      <TableBody>
        {movieSelections.map((movieSelection) => (
          <TableRow key={movieSelection.friendId}>
            <TableCell>
              <MovieSelectionCell movieSelection={movieSelection} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
