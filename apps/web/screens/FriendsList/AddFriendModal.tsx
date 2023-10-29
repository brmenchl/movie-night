import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateFriend } from '@packages/friends';
import { useCallback, useRef } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const addFriendFormSchema = z.object({
  name: z.string().trim().min(1, 'Enter a name!'),
});
type AddFriendFormValues = z.infer<typeof addFriendFormSchema>;

export const AddFriendModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  const createFriend = useCreateFriend();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddFriendFormValues>({
    resolver: zodResolver(addFriendFormSchema),
  });

  const createFriendFromInput: SubmitHandler<AddFriendFormValues> = useCallback(
    ({ name }) => {
      createFriend(name);
      reset();
      if (modalRef.current !== null) {
        window.HSOverlay.close(modalRef.current);
      }
    },
    [createFriend, reset],
  );

  return (
    <div
      ref={modalRef}
      id="add-friend"
      className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
    >
      <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
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
            <Button.Solid type="submit" data-hs-overlay>
              Save
            </Button.Solid>
          </div>
        </form>
      </div>
    </div>
  );
};
