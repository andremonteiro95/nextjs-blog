import { rest } from 'msw';
import { setupServer } from 'msw/node';
import fetch from 'node-fetch';
import {
  getCommentsByPostId,
  getPostById,
  getPosts,
  postComment,
} from '../../api';
import { API_BASE_URL, API_ENDPOINTS } from '../../constants';
import db from '../../../api/testdb';

global.fetch = fetch;
window.setImmediate = window.setTimeout;

describe('api/index.js', () => {
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

  describe('getPosts', () => {
    it('returns the actual posts and pagination info', async () => {
      const { posts, pagination } = await getPosts();

      expect(posts.length).toEqual(5);
      expect(pagination.next?._page).toEqual('2');
    });
  });

  describe('getPostById', () => {
    it('returns the actual post info', async () => {
      const id = 1;
      const original = db.posts.find((post) => post.id === id);
      const post = await getPostById(id);

      Object.keys(original).forEach((key) => {
        expect(post[key]).toEqual(original[key]);
      });
    });

    it('should return undefined in case the post does not exist', async () => {
      const post = await getPostById(999999);
      expect(post).toBeUndefined();
    });
  });

  describe('getCommentsByPostId', () => {
    it('returns all the comments for a post', async () => {
      const postId = 1;
      const originalComments = db.comments.filter(
        (comment) => comment.postId === postId,
      );
      const comments = await getCommentsByPostId(postId);

      expect(comments.length).toEqual(originalComments.length);
    });

    it('should return an empty array in case the post does not exist', async () => {
      const comments = await getCommentsByPostId(999999);
      expect(comments.length).toEqual(0);
    });
  });

  describe('postComment', () => {
    it('should create a comment correctly', async () => {
      const latestCommentId = db.comments[db.comments.length - 1].id;
      const postId = 1;
      const mockComment = {
        user: 'Mock',
        content: 'Mock content',
        parent_id: 1,
      };

      server.use(
        rest.post(
          `${API_BASE_URL}${API_ENDPOINTS.singlePostComments(':id')}`,
          (req, res, ctx) => {
            const { body } = req;
            return res(
              ctx.status(201),
              ctx.json({
                ...body,
                id: latestCommentId + 1,
              }),
            );
          },
        ),
      );

      const createdComment = await postComment(postId, mockComment);

      expect(createdComment.id).toEqual(latestCommentId + 1);
      expect(createdComment.user).toEqual(mockComment.user);
      expect(createdComment.content).toEqual(mockComment.content);
      expect(createdComment.postId).toEqual(postId);

      const date = new Date();
      expect(createdComment.date).toEqual(
        `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      );
    });
  });
});
