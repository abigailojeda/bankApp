import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ActionButton } from '../components/ActionButton';
import '@testing-library/jest-dom';

const DummyIcon: React.FC<{ color?: string; width?: string; height?: string }> = ({
  color,
  width,
  height,
}) => (
  <svg
    data-testid="dummy-icon"
    style={{ fill: color, width, height }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="100%" height="100%" />
  </svg>
);

describe('ActionButton', () => {
  it('Button is rendered with text', () => {
    render(<ActionButton text="Test Button" click={() => {}} color="black" />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('Button is rendered with icon', () => {
    render(
      <ActionButton
        text="Icon Button"
        click={() => {}}
        Icon={DummyIcon}
        iconColor="red"
        iconWidth="24px"
        iconHeight="24px"
        color="black"
      />
    );
    const icon = screen.getByTestId('dummy-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveStyle('fill: red');
    expect(icon).toHaveStyle('width: 24px');
    expect(icon).toHaveStyle('height: 24px');
  });

  it('function executed onClick', () => {
    const handleClick = vi.fn();
    render(<ActionButton text="Click Me" click={handleClick} color="black" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('style changed on hover', () => {
    render(
      <ActionButton
        text="Hover Test"
        click={() => {}}
        color="black"
        hoverColor="blue"
        hasBackground
        backgroundColor="white"
        hoverBackgroundColor="gray"
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('color: black');
    expect(button).toHaveStyle('background-color: white');

    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle('color: blue');
    expect(button).toHaveStyle('background-color: gray');

    fireEvent.mouseLeave(button);
    expect(button).toHaveStyle('color: black');
    expect(button).toHaveStyle('background-color: white');
  });

  it('disabled button rendered', () => {
    render(<ActionButton text="Disabled" click={() => {}} color="black" disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveStyle('cursor: not-allowed');
  });
});
