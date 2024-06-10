import { Input } from '@/components/ui/input';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateFriend } from '@/packages/friends';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Enter a name!'),
});

type FormValues = z.infer<typeof formSchema>;

export const AddFriendModal = () => {
  const createFriend = useCreateFriend();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const createFriendFromInput = useCallback(
    ({ name }: FormValues) => {
      createFriend(name);
      form.reset();
    },
    [createFriend, form],
  );

  return (
    <DialogContent>
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>Add friend</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(createFriendFromInput)}
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
