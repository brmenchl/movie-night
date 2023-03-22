import Head from 'next/head';
import { Content, Header } from 'rsuite';

export const Layout = (props: { children: React.ReactNode }) => (
  <>
    <Head>
      <title>Movie night | Spin the Wheel!</title>
    </Head>
    <Header>
      <h1>Movie Night!</h1>
    </Header>
    <Content>{props.children}</Content>
  </>
);
