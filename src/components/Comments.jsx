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
  const [parentComment, setParentComment] = useState(null);

  const onCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
    onParentClear();
  };

  const onReplyClick = (commentId) => {
    setParentComment(comments.find((comment) => comment.id === commentId));
  };

  const onParentClear = () => {
    setParentComment(null);
  };

  return (
    <Section>
      <Title>
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </Title>
      {comments
        .filter((comment) => comment.parent_id == null)
        .map((comment) => (
          <div key={comment.id}>
            <Comment comment={comment} onReplyClick={onReplyClick} />
            {comments
              .filter((childComment) => childComment.parent_id === comment.id)
              .map((childComment) => (
                <Comment
                  child
                  key={childComment.id}
                  comment={childComment}
                  onReplyClick={onReplyClick}
                />
              ))}
          </div>
        ))}
      <CommentForm
        parentComment={parentComment}
        postId={postId}
        onCommentAdded={onCommentAdded}
        onParentClear={onParentClear}
      />
    </Section>
  );
}

export default Comments;
