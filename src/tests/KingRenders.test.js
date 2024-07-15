import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './../components/App';

test('renders King at least once on the page', () => {
  render(<App />);
  const chessElement = screen.getByText(/King/i);
  expect(chessElement).toBeInTheDocument();
});
