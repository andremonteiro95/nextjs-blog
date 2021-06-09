import Head from 'next/head';
import { getPostById } from '../../api/posts';
import BlogLayout from '../../components/BlogLayout';
import Post from '../../components/Post';

export default function PostPage(props) {
  const { post } = props;
  return (
    <>
      <Head>
        <title>My Awesome Blog</title>
        <meta name="description" content="Mock blog!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlogLayout>
        <Post post={post} />
      </BlogLayout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const post = await getPostById(id);
  return {
    props: {
      post,
    },
  };
}
