import DOMPurify from 'isomorphic-dompurify';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Article = styled.article`
  margin-bottom: 2.5rem;
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
  const { post, preview } = props;

  const content = DOMPurify.sanitize(post.content);
  console.log(content);

  return (
    <Article>
      <Header>
        <Meta>
          {post.author}
          {' on '}
          <time dateTime={post.publish_date}>{post.publish_date}</time>
        </Meta>
        <Title>{post.title}</Title>
      </Header>
      {!preview && (
        <Content
          dangerouslySetInnerHTML={{
            __html: content,
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
  );
}

export default Post;
