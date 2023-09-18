import Head from 'next/head';

export const Layout = (props: { children: React.ReactNode }) => (
  <>
    <Head>
      <title>Movie night | Spin the Wheel!</title>
    </Head>
    <div className="container mx-auto">{props.children}</div>
  </>
);
