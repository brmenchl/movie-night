import { O } from '@mobily/ts-belt';
import { useNextNightId } from '@packages/nights';
import { useRouter } from 'next/router';
import { NoScheduledNight } from '@screens/NoScheduledNight';

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
    NoScheduledNight,
  );
};

export default HomePage;
