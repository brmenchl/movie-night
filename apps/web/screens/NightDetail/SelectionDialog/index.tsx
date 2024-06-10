import { NightHeader } from './NightHeader';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { MovieForm } from './MovieForm';
import { MovieList } from './MovieList';

export const SelectionDialog = () => (
  <>
    <DialogTrigger asChild>
      <Button variant="outline">
        <HamburgerMenuIcon />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <NightHeader />
      </DialogHeader>
      <MovieForm />
      <MovieList />
    </DialogContent>
  </>
);