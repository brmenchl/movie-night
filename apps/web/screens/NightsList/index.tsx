import { Layout } from '@components/Layout';
import { useNights } from '@packages/nights';
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import Link from 'next/link';

export const NightsList = () => {
  const nights = useNights();

  return (
    <Layout>
      <ul>
        {nights.map((night) => (
          <li key={night.id}>
            <Link href={`/nights/${night.id}`}>
              {format(parseISO(night.date), 'MMM d yyyy')}
            </Link>
            <p>Theme: {night.theme}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
