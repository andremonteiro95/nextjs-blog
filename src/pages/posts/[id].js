import Head from 'next/head';
import { getCommentsByPostId, getPostById } from '../../api';
import BlogLayout from '../../components/BlogLayout';
import Post from '../../components/Post';
import { BLOG_TITLE } from '../../constants';

export default function PostPage(props) {
  const { comments, post } = props;
  return (
    <>
      <Head>
        <title>
          {post.title} – {BLOG_TITLE}
        </title>
        <meta name="description" content={post.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlogLayout>
        <Post comments={comments} post={post} />
      </BlogLayout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  const post = await getPostById(id);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const comments = await getCommentsByPostId(id);

  return {
    props: {
      post,
      comments,
    },
  };
}
