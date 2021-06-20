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

function CommentForm(props) {
  const { postId, onCommentAdded } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    postComment(postId, data).then((res) => {
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
          Replying to John Doe
        </FormFooter>
      </form>
    </Container>
  );
}

export default CommentForm;
