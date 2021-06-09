import React from 'react';
import styled from 'styled-components';

const Main = styled.main`
  max-width: 600px;
  padding-left: 24px;
  padding-right: 24px;
  margin: auto;
`;

function BlogLayout(props) {
  const { children } = props;

  return <Main>{children}</Main>;
}

export default BlogLayout;
