import { F, O } from '@mobily/ts-belt';
import { getNextNightId } from '@packages/nights';
import { type GetServerSideProps, type GetServerSidePropsResult } from 'next';

const nightUrl = (nightId: string) => `/nights/${nightId}`;

export const getServerSideProps: GetServerSideProps<
  Record<string, never>
> = async () => {
  const nightId = await getNextNightId();
  return O.match<string, GetServerSidePropsResult<Record<string, never>>>(
    nightId,
    (id) => ({
      redirect: {
        permanent: false,
        destination: nightUrl(id),
      },
    }),
    F.always({ props: {} }),
  );
};

const NoScheduleNightHomePage = () => <h1>NO SCHEDULED NIGHT</h1>;

export default NoScheduleNightHomePage;
