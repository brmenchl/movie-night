import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Content, Header } from 'rsuite';

export const Layout: React.FC<PropsWithChildren> = (props) => (
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
