import Head from 'next/head';
import { getPosts } from '../../api';
import BlogLayout from '../../components/BlogLayout';
import Pagination from '../../components/Pagination';
import Post from '../../components/Post';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '../../constants';

export default function BlogPage(props) {
  const { pagination, posts } = props;
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
        <Pagination pagination={pagination} />
      </BlogLayout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { number } = params;
  const { pagination, posts } = await getPosts(number);
  return {
    props: {
      pagination,
      posts,
    },
  };
}
