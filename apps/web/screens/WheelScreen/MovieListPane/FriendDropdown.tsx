import { InputPicker } from 'rsuite';
import { useFriendsFormData } from './useFriendsFormData';

export const FriendDropdown = (props: {
  friendId: string;
  onChange: (value: string) => void;
}) => {
  const { data, disabledItemValues } = useFriendsFormData();
  return (
    <InputPicker
      data={data}
      disabledItemValues={disabledItemValues}
      value={props.friendId}
      onChange={props.onChange}
      placeholder="Who are you?"
      creatable
    />
  );
};
