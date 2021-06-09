import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  background-color: #445064;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  padding: 40px 0;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    min-height: 0;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  text-align: center;
`;

const Description = styled.h2`
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: normal;
  text-align: center;
`;

function BlogHeader() {
  return (
    <Header>
      <Link href="/">
        <a>
          <Title>My Awesome Blog</Title>
        </a>
      </Link>
      <Description>This is a mock description</Description>
    </Header>
  );
}

export default BlogHeader;
