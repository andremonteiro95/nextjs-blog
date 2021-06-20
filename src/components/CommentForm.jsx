import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { postComment } from '../api';

const Container = styled.div`
  margin-top: 2rem;
`;

const Input = styled.input`
  width: 100%;
  max-width: 250px;
`;

const Textarea = styled.textarea`
  width: 100%;
  margin-top: 0.5rem;
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
  font-size: 0.9rem;
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

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.8rem;
`;

function CommentForm(props) {
  const { parentComment, postId, onCommentAdded, onParentClear } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    postComment(postId, {
      ...data,
      parent_id: parentComment ? parentComment.id : null,
    }).then((res) => {
      onCommentAdded(res);
      reset();
      setLoading(false);
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Name"
          type="text"
          {...register('user', {
            required: true,
          })}
          className={errors.user ? 'invalid' : ''}
        />
        {errors.user && (
          <ErrorMessage>Please provide a valid name.</ErrorMessage>
        )}
        <Textarea
          rows={3}
          placeholder="Add a comment"
          {...register('content', {
            required: true,
          })}
          className={errors.content ? 'invalid' : ''}
        />
        {errors.content && <ErrorMessage>Please write a comment.</ErrorMessage>}
        <FormFooter>
          <Button type="submit" disabled={loading}>
            Post comment
          </Button>
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
