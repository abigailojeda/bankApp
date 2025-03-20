import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ActionButton } from '../components/ActionButton';
import '@testing-library/jest-dom';

const DummyIcon: React.FC<{ color?: string; width?: string; height?: string }> = ({
  width,
  height,
}) => (
  <svg
    data-testid="dummy-icon"
    style={{ width, height }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="100%" height="100%" />
  </svg>
);

describe('ActionButton', () => {
  it('render text on button', () => {
    render(
      <ActionButton
        text="Test Button"
        click={() => {}}
        color="text-black"
      />
    );
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('render icon on button', () => {
    render(
      <ActionButton
        text="Icon Button"
        click={() => {}}
        Icon={DummyIcon}
        iconWidth="24px"
        iconHeight="24px"
        color="text-black"
      />
    );
    const icon = screen.getByTestId('dummy-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle('width: 24px');
    expect(icon).toHaveStyle('height: 24px');
  });

  it('execute function onclick', () => {
    const handleClick = vi.fn();
    render(
      <ActionButton
        text="Click Me"
        click={handleClick}
        color="text-black"
      />
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('iclude correct classes on hover', () => {
    render(
      <ActionButton
        text="Hover Test"
        click={() => {}}
        color="text-black"
        hoverColor="hover:text-blue"
        hasBackground
        backgroundColor="bg-white"
        hoverBackgroundColor="hover:bg-gray"
      />
    );
    const button = screen.getByRole('button');

    expect(button).toHaveClass('text-black');
    expect(button).toHaveClass('bg-white');

    expect(button.className).toContain('hover:text-blue');
    expect(button.className).toContain('hover:bg-gray');
  });

  it('render disabled button', () => {
    render(
      <ActionButton
        text="Disabled"
        click={() => {}}
        color="text-black"
        disabled
      />
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-not-allowed');
  });
});
