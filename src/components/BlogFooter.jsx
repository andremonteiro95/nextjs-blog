import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { BLOG_TITLE } from '../constants';

const Footer = styled.footer`
  padding: 1rem;
  font-size: 0.9rem;
  color: #9eabb3;
  text-align: center;
`;

const FooterLink = styled.a`
  color: #9eabb3;

  &:hover {
    color: inherit;
  }
`;

function BlogFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <Footer>
      <Link href="/">
        <FooterLink>{BLOG_TITLE}</FooterLink>
      </Link>
      &nbsp;&copy; {currentYear}
    </Footer>
  );
}

export default BlogFooter;
