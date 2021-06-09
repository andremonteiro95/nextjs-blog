import Head from 'next/head';
import { getPosts } from '../api/posts';
import BlogLayout from '../components/BlogLayout';
import Post from '../components/Post';

export default function Home(props) {
  const { posts } = props;
  return (
    <>
      <Head>
        <title>My Awesome Blog</title>
        <meta name="description" content="Mock blog!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BlogLayout>
        {posts.map((post) => (
          <Post key={post.id} post={post} preview />
        ))}
      </BlogLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
}
