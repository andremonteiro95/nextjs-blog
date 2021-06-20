import { render, screen } from '@testing-library/react';
import BlogFooter from '../../components/BlogFooter';

describe('App', () => {
  it('renders without crashing', () => {
    render(<BlogFooter />);
    expect(
      screen.getByRole('heading', { name: 'Welcome to Next.js!' }),
    ).toBeInTheDocument();
  });
});
