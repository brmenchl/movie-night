import { useFriends } from '@packages/friends';
import { useMovieSelections } from '@packages/movies';
import { useNightId } from '@packages/nights';

export const useFriendsFormData = () => {
  const nightId = useNightId();
  const alreadySelectedFriendIds = useMovieSelections(nightId).map(
    (selection) => selection.friendId,
  );

  return useFriends().map(toDataOption(alreadySelectedFriendIds));
};

const toDataOption =
  (alreadySelectedFriendIds: string[]) =>
  ({ id, name }: { id: string; name: string }) => ({
    value: id,
    label: name,
    disabled: alreadySelectedFriendIds.includes(id),
  });
