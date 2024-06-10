import { Layout } from '@/components/Layout';
import { useFriends } from '@/packages/friends';
import { type ReactNode } from 'react';
import { PlusIcon } from 'lucide-react';
import { AddFriendModal } from './AddFriendModal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

export const FriendsList = () => {
  const friends = useFriends();

  return (
    <Layout>
      <Dialog>
        <div className="max-w-[60rem] my-10 lg:my-14 mx-auto bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Friends</h2>

            <DialogTrigger asChild>
              <Button>
                <div className="w-5">
                  <PlusIcon />
                </div>
                Add friend
              </Button>
            </DialogTrigger>
            <AddFriendModal />
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left flex items-center"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                    Name
                  </span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {friends.map((friend) => (
                <tr key={friend.id}>
                  <Cell>{friend.name}</Cell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>
    </Layout>
  );
};

const Cell = (props: { children: ReactNode }) => (
  <td className="h-px w-px px-6 py-3 whitespace-nowrap items-center">
    <span className="text-sm font-semibold text-gray-800">
      {props.children}
    </span>
  </td>
);
