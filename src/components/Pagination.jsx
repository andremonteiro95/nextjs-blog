import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  margin-bottom: 2rem;
  font-size: 0.9rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  color: #9eabb3;

  > :nth-child(3n + 2) {
    text-align: center;
  }

  > :nth-child(3n + 3) {
    text-align: right;
  }
`;

function Pagination(props) {
  const { pagination } = props;

  const lastPage = pagination.last._page;
  const currentPage = pagination.next ? pagination.next._page - 1 : lastPage;

  return (
    <Nav>
      <span>
        {pagination.prev && (
          <Link href={currentPage > 2 ? `/page/${currentPage - 1}` : '/'}>
            <a>&larr; Newer posts </a>
          </Link>
        )}
      </span>

      <span>
        Page {currentPage} of {lastPage}
      </span>

      <span>
        {pagination.next && (
          <Link href={`/page/${currentPage + 1}`}>
            <a>Older posts &rarr;</a>
          </Link>
        )}
      </span>
    </Nav>
  );
}

export default Pagination;
