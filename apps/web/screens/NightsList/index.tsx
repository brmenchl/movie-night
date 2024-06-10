import { Layout } from '@/components/Layout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useNights } from '@/packages/nights';
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import Link from 'next/link';

export const NightsList = () => {
  const nights = useNights();

  return (
    <Layout>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Theme</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nights.map((night) => (
            <TableRow key={night.id}>
              <TableCell key={night.id}>
                <Link href={`/nights/${night.id}`}>
                  {format(parseISO(night.date), 'MMM d yyyy')}
                </Link>
              </TableCell>
              <TableCell>{night.theme}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
};
