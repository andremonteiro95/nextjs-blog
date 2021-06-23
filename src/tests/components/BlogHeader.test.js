import { render, screen } from '@testing-library/react';
import BlogHeader from '../../components/BlogHeader';
import { BLOG_DESCRIPTION, BLOG_TITLE } from '../../constants';

describe('BlogHeader', () => {
  it('renders a small header', () => {
    const res = render(<BlogHeader />);

    const header = res.container.children[0];
    const blogTitle = screen.getByText(`${BLOG_TITLE}`);

    try {
      screen.getByText(`${BLOG_DESCRIPTION}`);
      fail('The description should not have been found in the document.');
    } catch (err) {
      expect(
        err.message.includes('Unable to find an element with the text'),
      ).toBeTruthy();
    }

    expect(header.tagName.toLowerCase()).toEqual('header');
    expect(blogTitle).toBeInTheDocument();
  });

  it('renders a large header', () => {
    const res = render(<BlogHeader large />);

    const header = res.container.children[0];
    const blogTitle = screen.getByText(`${BLOG_TITLE}`);
    const blogDescription = screen.getByText(`${BLOG_DESCRIPTION}`);

    expect(header.tagName.toLowerCase()).toEqual('header');
    expect(blogTitle).toBeInTheDocument();
    expect(blogDescription).toBeInTheDocument();
  });
});
