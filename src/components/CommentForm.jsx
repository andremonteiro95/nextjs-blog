import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { postComment } from '../api';

const Container = styled.div`
  margin-top: 2rem;
`;

const Input = styled.input`
  margin-bottom: 0.5rem;
  width: 100%;
  max-width: 250px;
`;

const Textarea = styled.textarea`
  width: 100%;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const Button = styled.button`
  color: #ffffff;
`;

const ParentCommentInfo = styled.span`
  display: flex;
  align-items: center;
  height: fit-content;
`;

const ClearIcon = styled.span`
  cursor: pointer;
  color: #dc3545;
  margin-left: 0.5rem;
  font-size: 1.2rem;

  &:hover {
    color: #bb2d3b;
  }
`;

function CommentForm(props) {
  const { parentComment, postId, onCommentAdded, onParentClear } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    postComment(postId, {
      ...data,
      parent_id: parentComment ? parentComment.id : null,
    }).then((res) => {
      onCommentAdded(res);
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Name" type="text" {...register('user')} />
        <Textarea
          rows={3}
          placeholder="Add a comment"
          {...register('content')}
        />
        <FormFooter>
          <Button type="submit">Post comment</Button>
          {parentComment && (
            <ParentCommentInfo>
              Replying to {parentComment.user}
              <ClearIcon
                onClick={() => {
                  onParentClear();
                }}
              >
                &#10006;
              </ClearIcon>
            </ParentCommentInfo>
          )}
        </FormFooter>
      </form>
    </Container>
  );
}

export default CommentForm;
