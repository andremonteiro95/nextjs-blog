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
