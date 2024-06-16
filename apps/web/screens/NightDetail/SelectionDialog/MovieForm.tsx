import { useCallback } from 'react';

import { useSelectMovie } from '@/packages/movies';
import { useNightId } from '@/packages/nights';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFriendsFormData } from './useFriendsFormData';

const formSchema = z.object({
  movie: z.string().min(1, 'Cmon, add a movie'),
  friendId: z.string({ required_error: 'Wait, who are you?' }),
});
type FormValues = z.infer<typeof formSchema>;

export const MovieForm = () => {
  const nightId = useNightId();
  const selectMovie = useSelectMovie(nightId);
  const friends = useFriendsFormData();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movie: '',
      friendId: '',
    },
  });

  const addMovieSelectionFromInput: SubmitHandler<FormValues> = useCallback(
    ({ friendId, movie }) => {
      selectMovie({ friendId, title: movie });
      form.reset();
    },
    [selectMovie, form],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(addMovieSelectionFromInput)}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="movie"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Add a movie!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="friendId"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Who are you?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {friends.map(({ label, value, disabled }) => (
                      <SelectItem key={value} value={value} disabled={disabled}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Add
        </Button>
      </form>
    </Form>
  );
};
