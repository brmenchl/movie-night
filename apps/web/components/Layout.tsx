import Head from 'next/head';

export const Layout = (props: { children: React.ReactNode }) => (
  <>
    <Head>
      <title>Movie night | Spin the Wheel!</title>
    </Head>
    <div className="h-full w-full flex flex-col">{props.children}</div>
  </>
);
