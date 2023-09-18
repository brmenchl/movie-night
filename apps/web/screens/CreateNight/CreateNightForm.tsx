import { useCreateNight } from '@packages/nights';
import Link from 'next/link';
import { useCallback } from 'react';
import { Button } from '@components/Button';
import { z } from 'zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@components/Input';

const createNightSchema = z.object({
  theme: z.string().min(1, 'Gotta add a theme!'),
  date: z.coerce.date({ required_error: 'Enter a date' }),
});
type CreateNightFormValues = z.infer<typeof createNightSchema>;

export const CreateNightForm = () => {
  const createNight = useCreateNight();

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CreateNightFormValues>({
    resolver: zodResolver(createNightSchema),
  });

  const createNightFromInput: SubmitHandler<CreateNightFormValues> =
    useCallback(
      ({ date, theme }) => {
        createNight({ theme, date: new Date(date) });
        reset();
      },
      [createNight, reset],
    );

  console.log(errors, getValues());
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 80,
      }}
    >
      <form onSubmit={handleSubmit(createNightFromInput)}>
        <div>
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <Input type="date" id="date" {...register('date')} />
          {errors.date && (
            <span className="text-red-800 block mt-2">
              {errors.date.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="theme"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Theme
          </label>
          <Input
            id="theme"
            placeholder="Pick a good one"
            {...register('theme')}
          />
          {errors.theme && (
            <span className="text-red-800 block mt-2">
              {errors.theme.message}
            </span>
          )}
        </div>
        <Button.Solid type="submit" disabled={isSubmitting}>
          Submit
        </Button.Solid>
        <Link href="/" passHref>
          <Button.Solid>Cancel</Button.Solid>
        </Link>
      </form>
    </div>
  );
};
