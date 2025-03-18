import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { DashboardPage } from '../components/DashboardPage';

describe('DashboardPage', () => {
  it('shows "Hola Mundo"', async () => {
    render(
      <MockedProvider>
        <DashboardPage />
      </MockedProvider>
    );
    
    // "Hola Mundo" is presumably text in the component
    const headingElement = screen.getByText(/Hola Mundo/i);
    expect(headingElement).toBeInTheDocument();
  });
});
