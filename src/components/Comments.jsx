import React, { useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import CommentForm from './CommentForm';

const Section = styled.section`
  margin-bottom: 4rem;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

function Comments(props) {
  const { comments: propComments, postId } = props;
  const [comments, setComments] = useState(propComments);

  const onCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <Section>
      <Title>
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </Title>
      {comments
        .filter((comment) => comment.parent_id == null)
        .map((comment) => (
          <>
            <Comment key={comment.id} comment={comment} />
            {comments
              .filter((childComment) => childComment.parent_id === comment.id)
              .map((childComment) => (
                <Comment key={childComment.id} comment={childComment} child />
              ))}
          </>
        ))}
      <CommentForm postId={postId} onCommentAdded={onCommentAdded} />
    </Section>
  );
}

export default Comments;
