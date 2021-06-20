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
          {post.title} &dash; {BLOG_TITLE}
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

  const [post, comments] = await Promise.all([
    getPostById(id),
    getCommentsByPostId(id),
  ]);

  return {
    props: {
      post,
      comments,
    },
  };
}
