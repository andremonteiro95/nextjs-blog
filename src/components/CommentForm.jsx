import React from 'react';
import styled from 'styled-components';

const Textarea = styled.textarea`
  width: 100%;
  border-radius: 4px;
  padding: 0.5rem;
`;

function CommentForm() {
  return (
    <div>
      <Textarea rows={3} placeholder="Add a comment" />
      Replying to John Doe
    </div>
  );
}

export default CommentForm;
