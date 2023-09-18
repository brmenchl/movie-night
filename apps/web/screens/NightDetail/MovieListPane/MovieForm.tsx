import { useCallback } from 'react';

import { useSelectMovie } from '@packages/movies';
import { useNightId } from '@packages/nights';

import { FriendDropdown } from './FriendDropdown';
import { MovieList } from './MovieList';
import { Button } from '@components/Button';
import { Icon } from '@components/Icon';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type Control,
  type SubmitHandler,
  useController,
  useForm,
} from 'react-hook-form';
import { Input } from '@components/Input';

const movieFormSchema = z.object({
  movie: z.string().min(1, 'Cmon, add a movie'),
  friendId: z.string({ required_error: 'Wait, who are you?' }),
});
type MovieFormValues = z.infer<typeof movieFormSchema>;

export const MovieForm = () => {
  const nightId = useNightId();
  const selectMovie = useSelectMovie(nightId);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MovieFormValues>({
    resolver: zodResolver(movieFormSchema),
  });

  const addMovieSelectionFromInput: SubmitHandler<MovieFormValues> =
    useCallback(
      ({ friendId, movie }) => {
        selectMovie({ friendId, title: movie });
        reset();
      },
      [reset, selectMovie],
    );

  return (
    <div>
      <form onSubmit={handleSubmit(addMovieSelectionFromInput)}>
        <div>
          <Input placeholder="Add a movie!" {...register('movie')} />
          <Button.Icon onClick={() => reset()}>
            <Icon.X />
          </Button.Icon>
          {errors.movie && (
            <span className="text-red-800 block mt-2">
              {errors.movie.message}
            </span>
          )}
          <div>
            <FriendDropdownFormControl control={control} />
            {errors.friendId && (
              <span className="text-red-800 block mt-2">
                {errors.friendId.message}
              </span>
            )}
          </div>
        </div>
        <Button.Icon type="submit" disabled={isSubmitting}>
          <Icon.Plus />
        </Button.Icon>
      </form>
      <MovieList />
    </div>
  );
};

const FriendDropdownFormControl = ({
  control,
}: {
  control: Control<MovieFormValues>;
}) => {
  const { field } = useController({
    control,
    name: 'friendId',
  });

  return <FriendDropdown friendId={field.value} onChange={field.onChange} />;
};
