import Head from 'next/head';
import { getPosts } from '../api';
import BlogLayout from '../components/BlogLayout';
import Post from '../components/Post';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '../constants';

export default function Home(props) {
  const { posts } = props;
  return (
    <>
      <Head>
        <title>{BLOG_TITLE}</title>
        <meta name="description" content={BLOG_DESCRIPTION} />
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
