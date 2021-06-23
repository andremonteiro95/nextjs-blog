import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import fetch from 'node-fetch';
import { API_BASE_URL, API_ENDPOINTS } from '../../constants';
import Home, { getServerSideProps } from '../../pages';
import db from '../../../api/testdb';

global.fetch = fetch;
window.setImmediate = window.setTimeout;

describe('Home', () => {
  const server = setupServer(
    rest.get(`${API_BASE_URL}${API_ENDPOINTS.posts}`, (req, res, ctx) => {
      return res(
        ctx.json(db.posts.slice(0, 5)),
        ctx.set(
          'Link',
          '<http://localhost:9000/posts?_sort=publish_date&_order=desc&_page=1&_limit=5>; rel="first", <http://localhost:9000/posts?_sort=publish_date&_order=desc&_page=2&_limit=5>; rel="next", <http://localhost:9000/posts?_sort=publish_date&_order=desc&_page=2&_limit=5>; rel="last"',
        ),
      );
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render a page with the posts', async () => {
    const { props } = await getServerSideProps();
    const { posts, pagination } = props;
    expect(posts.length).toEqual(5);
    expect(pagination.next?._page).toEqual('2');

    render(<Home pagination={pagination} posts={posts} />);

    posts.forEach((post) => {
      const title = screen.getByText(post.title);
      const desc = screen.getByText(post.description);
      expect(title).toBeInTheDocument();
      expect(desc).toBeInTheDocument();
    });
  });
});
