import React from 'react';
import styled from 'styled-components';

const CommentWrapper = styled.div`
  margin-bottom: 1rem;
`;

const Meta = styled.span`
  color: #9eabb3;
`;

const Header = styled.header`
  margin-bottom: 0.2rem;
`;

const Footer = styled.footer`
  margin-top: 0.2rem;
  font-size: 0.9rem;
`;

const Bold = styled.span`
  font-weight: 500;
`;

function Comment(props) {
  const { comment, onReplyClick } = props;

  return (
    <CommentWrapper>
      <Header>
        <Meta>
          <Bold>{comment.user}</Bold>
          {' on '}
          <time dateTime={comment.date}>{comment.date}</time>
        </Meta>
      </Header>
      <div>
        <p>{comment.content}</p>
      </div>
      <Footer>
        <a
          onClick={() => {
            onReplyClick(comment.id);
          }}
        >
          Reply
        </a>
      </Footer>
    </CommentWrapper>
  );
}

export default Comment;
