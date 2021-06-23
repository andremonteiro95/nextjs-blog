export const BLOG_TITLE = 'My Awesome Blog';
export const BLOG_DESCRIPTION = 'This is a mock description';

export const POSTS_BY_PAGE = 5;

export const API_BASE_URL = 'http://localhost:9000';
export const API_ENDPOINTS = {
  posts: '/posts',
  singlePost: (postId) => `/posts/${postId}`,
  singlePostComments: (postId) => `/posts/${postId}/comments`,
};
