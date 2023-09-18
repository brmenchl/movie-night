import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Layout } from '@components/Layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateFriend, useFriends } from '@packages/friends';
import { useCallback } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const addFriendFormSchema = z.object({
  name: z.string({ required_error: 'Enter a name!' }),
});
type AddFriendFormValues = z.infer<typeof addFriendFormSchema>;

export const FriendsList = () => {
  const friends = useFriends();
  const createFriend = useCreateFriend();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddFriendFormValues>({
    resolver: zodResolver(addFriendFormSchema),
  });

  const createFriendFromInput: SubmitHandler<AddFriendFormValues> = useCallback(
    ({ name }) => {
      createFriend(name);
      reset();
    },
    [createFriend, reset],
  );

  return (
    <Layout>
      <h1>Friends</h1>
      <form onSubmit={handleSubmit(createFriendFromInput)}>
        <div>
          <label htmlFor="name">Name</label>
          <Input id="name" {...register('name')} />
          {errors.name && (
            <span className="text-red-800 block mt-2">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <Button.Solid type="submit" disabled={isSubmitting}>
            Submit
          </Button.Solid>
        </div>
      </form>

      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <p>{friend.name}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
