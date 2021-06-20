import { getDateForComment } from '../utils/date';
import { POSTS_BY_PAGE } from '../constants';
import parseLinkHeader from 'parse-link-header';

export async function getPosts(page = 1) {
  const res = await fetch(
    `http://localhost:9000/posts?_sort=publish_date&_order=desc&_page=${page}&_limit=${POSTS_BY_PAGE}`,
  );
  const posts = await res.json();
  const pagination = parseLinkHeader(res.headers.get('link'));
  return { posts, pagination };
}

export async function getPostById(id) {
  const res = await fetch(`http://localhost:9000/posts/${id}`);
  const data = await res.json();
  console.log(data);

  if (!data.id) {
    return undefined;
  }

  return data;
}

export async function getCommentsByPostId(id) {
  const res = await fetch(`http://localhost:9000/posts/${id}/comments`);
  const data = await res.json();
  return data;
}

export async function postComment(postId, { user, content, parent_id }) {
  const body = {
    user,
    content,
    parent_id,
    postId,
    date: getDateForComment(),
  };

  const res = await fetch(`http://localhost:9000/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  console.log(res);
  return data;
}
