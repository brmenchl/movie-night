import { useNights } from '@packages/nights';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Link from 'next/link';
import { List, Stack } from 'rsuite';

import styles from './NightsList.module.sass';

export const NightsList = () => {
  const nights = useNights();

  return (
    <div style={{ margin: 'auto', marginTop: 50, width: '80%' }}>
      <List>
        {nights.map((night) => (
          <List.Item key={night.id}>
            <Stack direction="column" alignItems="flex-start">
              <Stack.Item>
                <Link href={`/nights/${night.id}`}>
                  {format(parseISO(night.date), 'MMM d yyyy')}
                </Link>
              </Stack.Item>
              <Stack.Item>
                <p className={styles.themeText}>Theme: {night.theme}</p>
              </Stack.Item>
            </Stack>
          </List.Item>
        ))}
      </List>
    </div>
  );
};
