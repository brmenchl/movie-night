import { O } from '@mobily/ts-belt';
import { useNextNightId } from '@packages/nights';
import { useRouter } from 'next/router';

const nightUrl = (nightId: string) => `/nights/${nightId}`;

const HomePage = () => {
  const router = useRouter();
  const { loading, nextNightId } = useNextNightId();

  if (loading) {
    return null;
  }

  return O.match(
    nextNightId,
    (id) => {
      router.replace(nightUrl(id));
      return null;
    },
    () => <h1>NO SCHEDULED NIGHT</h1>,
  );
};

export default HomePage;
