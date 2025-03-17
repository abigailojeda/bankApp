import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import '@testing-library/jest-dom';

test('Counter init with 0 & increment by clicking button', async () => {
  render(<App />);

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();

  await userEvent.click(button);

  expect(button).toHaveTextContent('count is 1');
});
