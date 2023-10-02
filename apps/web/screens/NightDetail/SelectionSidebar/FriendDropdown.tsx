import { Select } from '@components/Select';
import { useFriendsFormData } from './useFriendsFormData';

export const FriendDropdown = (props: {
  friendId: string;
  onChange: (value: string) => void;
}) => {
  const data = useFriendsFormData();

  return (
    <Select
      onChange={(e) => props.onChange(e.target.value)}
      placeholder="Who are you?"
    >
      <option value="">Who are you?</option>
      {data.map(({ label, value, disabled }) => (
        <option key={value} value={value} disabled={disabled}>
          {label}
        </option>
      ))}
    </Select>
  );
};
