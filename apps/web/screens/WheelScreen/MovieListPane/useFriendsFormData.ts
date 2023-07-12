import { useFriends, useMovieSelections } from '@packages/movies';

export const useFriendsFormData = () => {
  const alreadySelectedFriendIds = useMovieSelections().map(
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
