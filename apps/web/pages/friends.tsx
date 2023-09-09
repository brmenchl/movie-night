import { useCreateFriend, useFriends } from '@packages/friends';
import { useCallback, useRef, useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Form,
  type FormInstance,
  List,
  Schema,
} from 'rsuite';

const dateRule = Schema.Types.StringType().isRequired('Enter a name!');

const FriendsPage = () => {
  const formRef = useRef<FormInstance>(null);
  const friends = useFriends();
  const [name, setName] = useState('');
  const createFriend = useCreateFriend();

  const createFriendFromInput = useCallback(() => {
    if (formRef.current?.check()) {
      createFriend(name);
      setName('');
    }
  }, [createFriend, name]);
  return (
    <div style={{ margin: 'auto', marginTop: 50, width: '80%' }}>
      <Form ref={formRef}>
        <Form.Group controlId="name">
          <Form.ControlLabel>Name</Form.ControlLabel>
          <Form.Control
            name="name"
            rule={dateRule}
            value={name}
            onChange={setName}
          />
        </Form.Group>
        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary" onClick={createFriendFromInput}>
              Submit
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>

      <List>
        {friends.map((friend) => (
          <List.Item key={friend.id}>
            <p>{friend.name}</p>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default FriendsPage;
