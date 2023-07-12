import { InputPicker } from 'rsuite';
import { useFriendsFormData } from './useFriendsFormData';
import { useCreateFriend } from '@packages/movies';

export const FriendDropdown = (props: {
  friendId: string;
  onChange: (value: string) => void;
}) => {
  const { data, disabledItemValues } = useFriendsFormData();
  const createFriend = useCreateFriend();
  return (
    <InputPicker
      data={data}
      disabledItemValues={disabledItemValues}
      value={props.friendId}
      onChange={props.onChange}
      onCreate={createFriend}
      placeholder="Who are you?"
      creatable
    />
  );
};
