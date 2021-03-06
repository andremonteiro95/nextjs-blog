import Head from 'next/head';
import { getPosts } from '../../api';
import BlogLayout from '../../components/BlogLayout';
import Pagination from '../../components/Pagination';
import Post from '../../components/Post';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '../../constants';

export default function BlogPage(props) {
  const { pagination, posts } = props;

  const currentPage = pagination.next
    ? pagination.next._page - 1
    : pagination.last._page;

  return (
    <>
      <Head>
        <title>
          Page {currentPage} – {BLOG_TITLE}
        </title>
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

  if (number < 2) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  const { pagination, posts } = await getPosts(number);

  if (!pagination) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pagination,
      posts,
    },
  };
}
