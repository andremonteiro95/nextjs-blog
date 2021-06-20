import React from 'react';
import styled from 'styled-components';
import BlogFooter from './BlogFooter';
import BlogHeader from './BlogHeader';

const Main = styled.main`
  max-width: 600px;
  padding-left: 24px;
  padding-right: 24px;
  margin: auto;
`;

function BlogLayout(props) {
  const { children } = props;

  return (
    <>
      <BlogHeader />
      <Main>{children}</Main>
      <BlogFooter />
    </>
  );
}

export default BlogLayout;
