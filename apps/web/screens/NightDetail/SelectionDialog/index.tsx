import { NightHeader } from './NightHeader';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { MovieForm } from './MovieForm';
import { MovieList } from './MovieList';

export const SelectionDialog = () => (
  <>
    <DialogContent>
      <DialogHeader>
        <NightHeader />
      </DialogHeader>
      <MovieForm />
      <MovieList />
    </DialogContent>
  </>
);

export const SelectionDialogTrigger = () => (
  <DialogTrigger asChild>
    <Button variant="default">Add a movie</Button>
  </DialogTrigger>
);
