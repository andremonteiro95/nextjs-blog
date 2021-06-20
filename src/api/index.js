import { getDateForComment } from '../utils/date';

export async function getPosts() {
  // TODO: Guardar url nas constantes
  try {
    const res = await fetch(`http://localhost:9000/posts`);
    const data = await res.json();
    return data;
  } catch (err) {
    return undefined;
  }
}

export async function getPostById(id) {
  try {
    const res = await fetch(`http://localhost:9000/posts/${id}`);
    const data = await res.json();

    if (!data.id) {
      return undefined;
    }

    return data;
  } catch (err) {
    return undefined;
  }
}

export async function getCommentsByPostId(id) {
  try {
    const res = await fetch(`http://localhost:9000/posts/${id}/comments`);
    const data = await res.json();
    return data;
  } catch (err) {
    return undefined;
  }
}

async function getLatestCommentId() {
  try {
    const res = await fetch(
      `http://localhost:9000/comments?_sort=id&_order=desc&_limit=1`,
    );
    const data = await res.json();
    console.log(data);
    return data[0].id;
  } catch (err) {
    return undefined;
  }
}

export async function postComment(postId, { user, content, parent_id }) {
  try {
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
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
