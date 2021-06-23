import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import fetch from 'node-fetch';
import { API_BASE_URL, API_ENDPOINTS } from '../../../constants';
import PostPage, { getServerSideProps } from '../../../pages/posts/[id]';
import db from '../../../../api/testdb';

global.fetch = fetch;
window.setImmediate = window.setTimeout;

describe('PostPage', () => {
  const server = setupServer(
    rest.get(
      `${API_BASE_URL}${API_ENDPOINTS.singlePost(':id')}`,
      (req, res, ctx) => {
        const id = +req.params.id;
        return res(ctx.json(db.posts.find((post) => post.id === id) || {}));
      },
    ),
    rest.get(
      `${API_BASE_URL}${API_ENDPOINTS.singlePostComments(':id')}`,
      (req, res, ctx) => {
        const id = +req.params.id;
        return res(
          ctx.json(db.comments.filter((comment) => comment.postId === id)),
        );
      },
    ),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should throw a 404 error if post is not found', async () => {
    const { notFound } = await getServerSideProps({ params: { id: 9999 } });
    expect(notFound).toBeTruthy();
  });

  it('should render a page with the posts', async () => {
    const { props } = await getServerSideProps({ params: { id: 1 } });
    const { post, comments } = props;

    render(<PostPage post={post} comments={comments} />);

    console.log(post, comments);

    const postTitle = screen.getByText(post.title);
    expect(postTitle).toBeInTheDocument();

    comments.forEach((comment) => {
      const content = screen.getByText(comment.content);
      expect(content).toBeInTheDocument();
    });
  });
});
