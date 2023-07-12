import { useFriends, useMovieSelections } from '@packages/movies';
import { useNightId } from '@packages/nights';

export const useFriendsFormData = () => {
  const nightId = useNightId();
  const alreadySelectedFriendIds = useMovieSelections(nightId).map(
    (selection) => selection.friendId,
  );

  return {
    data: useFriends().map(toDataOption),
    disabledItemValues: alreadySelectedFriendIds,
  };
};

const toDataOption = ({ id, name }: { id: string; name: string }) => ({
  value: id,
  label: name,
});
