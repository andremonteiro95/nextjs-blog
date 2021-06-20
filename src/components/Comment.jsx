import React from 'react';
import styled from 'styled-components';

const CommentWrapper = styled.div`
  margin-bottom: 1rem;
`;

const ChildCommentWrapper = styled(CommentWrapper)`
  padding-left: 3rem;
`;

const Meta = styled.span`
  color: #9eabb3;
`;

const Header = styled.header`
  margin-bottom: 0.2rem;
`;

const Footer = styled.footer`
  font-size: 0.9rem;
`;

function Comment(props) {
  const { child, comment } = props;

  const Wrapper = child ? ChildCommentWrapper : CommentWrapper;

  return (
    <Wrapper>
      <Header>
        <Meta>
          <b>{comment.user}</b>
          {' on '}
          <time dateTime={comment.date}>{comment.date}</time>
        </Meta>
      </Header>
      <div>
        <p>{comment.content}</p>
      </div>
      <Footer>
        <a>Reply</a>
      </Footer>
    </Wrapper>
  );
}

export default Comment;
