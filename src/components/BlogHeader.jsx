import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '../constants';

const SmallHeader = styled.header`
  background-color: #445064;
  width: 100%;
  height: 100%;
  display: flex;
  margin-bottom: 40px;
  min-height: 4rem;
`;

const LargeHeader = styled(SmallHeader)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  padding: 40px 0;
  text-align: center;
`;

const InnerHeader = styled.div`
  max-width: 600px;
  padding-left: 24px;
  padding-right: 24px;
  margin: auto;
  width: 100%;
`;

const SmallTitle = styled.h1`
  color: #ffffff;
  font-size: 1.25rem;
`;

const LargeTitle = styled(SmallTitle)`
  font-size: 2.5rem;
`;

const Description = styled.h2`
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: normal;
  text-align: center;
`;

function BlogHeader(props) {
  const { large } = props;

  const Header = large ? LargeHeader : SmallHeader;
  const Title = large ? LargeTitle : SmallTitle;

  return (
    <Header>
      <InnerHeader>
        <Link href="/">
          <a>
            <Title>{BLOG_TITLE}</Title>
          </a>
        </Link>
        {large && <Description>{BLOG_DESCRIPTION}</Description>}
      </InnerHeader>
    </Header>
  );
}

export default BlogHeader;
