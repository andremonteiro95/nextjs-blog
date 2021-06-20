import Error from 'next/error';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import BlogLayout from '../components/BlogLayout';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '../constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
`;

function PageNotFound() {
  return (
    <>
      <Head>
        <title>{BLOG_TITLE}</title>
        <meta name="description" content={BLOG_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlogLayout>
        <Container>
          <Title>404</Title>
          <Subtitle>Page not found</Subtitle>
        </Container>
      </BlogLayout>
    </>
  );
}

export default PageNotFound;
