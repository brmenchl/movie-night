import { useCreateNight } from '@/packages/nights';
import Link from 'next/link';
import { useCallback } from 'react';
import { z } from 'zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/router';

const formSchema = z.object({
  theme: z.string().min(1, 'Gotta add a theme!'),
  date: z.string({ required_error: 'Enter a date' }).date(),
});
type FormValues = z.infer<typeof formSchema>;

export const CreateNightForm = () => {
  const createNight = useCreateNight();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: '',
      date: '',
    },
  });

  const router = useRouter();
  const createNightFromInput: SubmitHandler<FormValues> = useCallback(
    ({ date, theme }) => {
      createNight({ theme, date: new Date(date) });
      form.reset();
      router.push('/nights');
    },
    [createNight, form, router],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createNightFromInput)}>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <FormControl>
                <Input placeholder="Pick a good one" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
        <Link href="/" passHref>
          <Button variant="destructive">Cancel</Button>
        </Link>
      </form>
    </Form>
  );
};
