import React, { useState } from 'react';
import styled from 'styled-components';
import Comments from './Comments';
import CommentForm from './CommentForm';

const Section = styled.section`
  margin-bottom: 4rem;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

function CommentSection(props) {
  const { comments: propComments, postId } = props;
  const [comments, setComments] = useState(propComments);
  const [parentComment, setParentComment] = useState(null);

  const onCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
    onParentClear();
  };

  const onParentClear = () => {
    setParentComment(null);
  };

  return (
    <Section>
      <Title>
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </Title>
      <Comments comments={comments} setParentComment={setParentComment} />
      <CommentForm
        parentComment={parentComment}
        postId={postId}
        onCommentAdded={onCommentAdded}
        onParentClear={onParentClear}
      />
    </Section>
  );
}

export default CommentSection;
