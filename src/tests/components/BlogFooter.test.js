import { render, screen } from '@testing-library/react';
import BlogFooter from '../../components/BlogFooter';
import { BLOG_TITLE } from '../../constants';

describe('BlogFooter', () => {
  it('renders the correct footer note', () => {
    render(<BlogFooter />);
    const blogTitle = screen.getByText(`${BLOG_TITLE}`);
    const footer = blogTitle.parentElement;

    expect(blogTitle).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(footer.tagName.toLowerCase()).toEqual('footer');
    expect(footer.textContent).toEqual(
      `${BLOG_TITLE} © ${new Date().getFullYear()}`,
    );
  });
});
