import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Modal } from '@components/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateFriend } from '@packages/friends';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const addFriendFormSchema = z.object({
  name: z.string().trim().min(1, 'Enter a name!'),
});
type AddFriendFormValues = z.infer<typeof addFriendFormSchema>;

export const AddFriendModal = () => {
  const createFriend = useCreateFriend();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddFriendFormValues>({
    resolver: zodResolver(addFriendFormSchema),
  });

  const createFriendFromInput = useCallback(
    ({ name }: AddFriendFormValues) => {
      createFriend(name);
      reset();
    },
    [createFriend, reset],
  );

  return (
    <Modal id="add-friend">
      <form
        onSubmit={handleSubmit(createFriendFromInput)}
        className="flex flex-col bg-white border shadow-sm rounded-xl"
      >
        <div className="flex justify-between items-center py-3 px-4 border-b">
          <h3 className="font-bold text-gray-800">Add friend</h3>
        </div>
        <div className="p-4 overflow-y-auto">
          <Input {...register('name')} autoFocus />
          {errors.name && (
            <span className="text-red-800 block mt-2">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
          <Button.Solid data-hs-overlay="#add-friend">Close</Button.Solid>
          <Button.Solid type="submit" data-hs-overlay="#add-friend">
            Save
          </Button.Solid>
        </div>
      </form>
    </Modal>
  );
};
