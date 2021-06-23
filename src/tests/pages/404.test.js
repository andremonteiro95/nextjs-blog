import { render, screen } from '@testing-library/react';
import PageNotFound from '../../pages/404';

describe('404', () => {
  it('should render a page with the error message', () => {
    render(<PageNotFound />);

    const title = screen.getByText('404');
    const desc = screen.getByText('Page not found');
    expect(title).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });
});
