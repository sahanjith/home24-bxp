import { render, screen } from '@testing-library/react';

import App from './App';

test('renders if Tailwind is working', () => {
  render(<App />);
  expect(screen.getByText(/Tailwind/i)).toBeInTheDocument();
});