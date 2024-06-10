import { Layout } from '@/components/Layout';
import { useFriends } from '@/packages/friends';
import { AddFriendModal } from './AddFriendModal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusIcon } from '@radix-ui/react-icons';

export const FriendsList = () => {
  const friends = useFriends();

  return (
    <Layout>
      <Dialog>
        <h1 className="text-4xl font-extrabold tracking-tight">Friends</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {friends.map((friend) => (
              <TableRow key={friend.id}>
                <TableCell>{friend.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogTrigger asChild>
          <Button className="mt-4">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add friend
          </Button>
        </DialogTrigger>
        <AddFriendModal />
      </Dialog>
    </Layout>
  );
};
