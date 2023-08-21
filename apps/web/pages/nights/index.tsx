import { useNights } from '@packages/nights/hooks';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Link from 'next/link';
import { List, Stack } from 'rsuite';

const NightsList = () => {
  const nights = useNights();

  return (
    <div style={{ margin: 'auto', marginTop: 50, width: '80%' }}>
      <List>
        {nights.map((night) => (
          <List.Item key={night.id}>
            <Stack direction="column" alignItems="flex-start">
              <Stack.Item>
                <Link href={`/nights/${night.id}`}>
                  {night.id}
                </Link>
              </Stack.Item>
              <Stack.Item>
                {format(parseISO(night.date), 'MMM d yyyy')}
              </Stack.Item>
              <Stack.Item>Theme: {night.theme}</Stack.Item>
            </Stack>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default NightsList;
