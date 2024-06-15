import Head from 'next/head';

export const Layout = (props: { children: React.ReactNode }) => (
  <>
    <Head>
      <title>Movie night | Spin the Wheel!</title>
    </Head>
    {props.children}
  </>
);
