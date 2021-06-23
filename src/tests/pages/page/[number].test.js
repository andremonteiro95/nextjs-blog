import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import fetch from 'node-fetch';
import { API_BASE_URL, API_ENDPOINTS } from '../../../constants';
import BlogPage, { getServerSideProps } from '../../../pages/page/[number]';
import db from '../../../../api/testdb';

global.fetch = fetch;
window.setImmediate = window.setTimeout;

describe('BlogPage', () => {
  const server = setupServer(
    rest.get(`${API_BASE_URL}${API_ENDPOINTS.posts}`, (req, res, ctx) => {
      return res(
        ctx.json(db.posts.slice(5, 10)),
        ctx.set(
          'Link',
          '<http://localhost:9000/posts?_sort=publish_date&_order=desc&_page=1&_limit=5>; rel="first", <http://localhost:9000/posts?_sort=publish_date&_order=desc&_page=1&_limit=5>; rel="prev", <http://localhost:9000/posts?_sort=publish_date&_order=desc&_page=2&_limit=5>; rel="last"',
        ),
      );
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should redirect to the front page if page < 2', async () => {
    const { redirect } = await getServerSideProps({ params: { number: 1 } });
    expect(redirect.destination).toEqual('/');
  });

  it('should throw a 404 error if page is not found', async () => {
    server.use(
      rest.get(`${API_BASE_URL}${API_ENDPOINTS.posts}`, (req, res, ctx) => {
        return res(ctx.json([]));
      }),
    );

    const { notFound } = await getServerSideProps({ params: { number: 999 } });
    expect(notFound).toBeTruthy();
  });

  it('should render a page with the posts', async () => {
    const { props } = await getServerSideProps({ params: { number: 2 } });
    const { posts, pagination } = props;
    expect(posts.length).toEqual(5);
    expect(pagination.next).toEqual(undefined);

    render(<BlogPage pagination={pagination} posts={posts} />);

    posts.forEach((post) => {
      const title = screen.getByText(post.title);
      const desc = screen.getByText(post.description);
      expect(title).toBeInTheDocument();
      expect(desc).toBeInTheDocument();
    });
  });
});
