import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

function Comments(props) {
  const { comments, parentId, level = 0, setParentComment } = props;

  const onReplyClick = (commentId) => {
    setParentComment(comments.find((comment) => comment.id === commentId));
  };

  const filteredComments = comments.filter((comment) =>
    parentId ? comment.parent_id === parentId : comment.parent_id == null,
  );

  const Container = styled.div`
    padding-left: ${level > 0 ? '3' : '0'}rem;
  `;

  return filteredComments.map((comment) => (
    <Container key={comment.id}>
      <Comment comment={comment} onReplyClick={onReplyClick} />
      <Comments
        comments={comments}
        parentId={comment.id}
        level={level + 1}
        setParentComment={setParentComment}
      />
    </Container>
  ));
}

export default Comments;
