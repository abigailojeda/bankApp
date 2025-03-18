import { render, screen } from '@testing-library/react';
import { DashboardPage } from '../components/DashboardPage';
import '@testing-library/jest-dom';

test('DashboardPage shows "Hola Mundo"', () => {
  render(<DashboardPage />);
  const headingElement = screen.getByText(/Hola Mundo/i);
  expect(headingElement).toBeInTheDocument();
});
