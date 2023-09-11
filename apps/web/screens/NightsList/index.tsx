import { useNights } from '@packages/nights';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Link from 'next/link';
import styles from './NightsList.module.sass';
import { List } from 'rsuite';

export const NightsList = () => {
  const nights = useNights();

  return (
    <div style={{ margin: 'auto', marginTop: 50, width: '80%' }}>
      <List>
        {nights.map((night) => (
          <List.Item key={night.id}>
            <Link href={`/nights/${night.id}`}>
              {format(parseISO(night.date), 'MMM d yyyy')}
            </Link>
            <p className={styles.themeText}>Theme: {night.theme}</p>
          </List.Item>
        ))}
      </List>
    </div>
  );
};
