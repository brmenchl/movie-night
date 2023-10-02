import { useCallback } from 'react';

import { useSelectMovie } from '@packages/movies';
import { useNightId } from '@packages/nights';

import { FriendDropdown } from './FriendDropdown';
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
import { InputWithAddon } from '@components/Input';

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
    <form onSubmit={handleSubmit(addMovieSelectionFromInput)}>
      <div className="flex flex-col gap-2">
        <div>
          <InputWithAddon placeholder="Add a movie!" {...register('movie')}>
            <Button.Wrapper className="flex-1" onClick={() => reset()}>
              <Icon.X />
            </Button.Wrapper>
          </InputWithAddon>
          {errors.movie && (
            <span className="text-red-800 block mt-2">
              {errors.movie.message}
            </span>
          )}
        </div>
        <div>
          <FriendDropdownFormControl control={control} />
          {errors.friendId && (
            <span className="text-red-800 block mt-2">
              {errors.friendId.message}
            </span>
          )}
        </div>
        <Button.Solid type="submit" disabled={isSubmitting} className="w-full">
          Add
        </Button.Solid>
      </div>
    </form>
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
