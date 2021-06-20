import DOMPurify from 'isomorphic-dompurify';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Comments from './Comments';

const Article = styled.article`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5eff5;
`;

const Header = styled.header`
  margin-bottom: 0.75rem;
`;

const Meta = styled.span`
  color: #9eabb3;
  font-size: 0.9rem;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const ReadMore = styled.a`
  color: #00a1e4;
`;

const Content = styled.section`
  margin-bottom: 1rem;
`;

function Post(props) {
  const { comments, post, preview } = props;

  return (
    <>
      <Article>
        <Header>
          <Meta>
            {post.author}
            {' on '}
            <time dateTime={post.publish_date}>{post.publish_date}</time>
          </Meta>
          <Link href={`/posts/${post.id}`}>
            <a>
              <Title>{post.title}</Title>
            </a>
          </Link>
        </Header>
        {!preview && (
          <Content
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}
          />
        )}
        {preview && (
          <>
            <Content>
              <p>{post.description}</p>
            </Content>
            <footer>
              <Link href={`/posts/${post.id}`}>
                <ReadMore>Continue reading &raquo;</ReadMore>
              </Link>
            </footer>
          </>
        )}
      </Article>
      {!preview && <Comments comments={comments} />}
    </>
  );
}

export default Post;
