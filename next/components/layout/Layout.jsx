import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  > main {
    flex-grow: 1;
  }
`;

export default function Layout({ children, styles, meta }) {
  return (
    <>
      <Head>
        <title>{meta?.title || 'Hi There'}</title>
      </Head>
      <PageWrapper style={styles}>
        <Header />
        {children}
        <Footer />
      </PageWrapper>
    </>
  );
}
