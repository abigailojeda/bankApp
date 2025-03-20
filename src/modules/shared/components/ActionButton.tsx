import React from 'react';
import { ActionButtonProps } from "../types/ActionButton.types";

export const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  hideTextOnMobile,
  click,
  Icon,
  iconWidth,
  iconHeight,
  color,
  width,
  height,
  hasBackground,
  disabled,
  backgroundColor,
  hoverBackgroundColor,
  hoverColor,
  rounded,
  fontSize,
  fontWeight
}) => {

  const buttonClasses = [
    'flex',
    'items-center',
    'justify-center',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    rounded ? 'rounded-full' : 'rounded-md',
    color,
    fontSize,
    fontWeight,
    width && width,
    height,
    hoverColor,
    hoverBackgroundColor,
    hasBackground && backgroundColor,
    hasBackground && rounded && 'p-1.5',
  ].filter(Boolean).join(' ');

  return (
    <button
      onClick={click}
      disabled={disabled}
      className={buttonClasses}
    >
      {Icon && <Icon width={iconWidth} height={iconHeight} />}
      <span className={hideTextOnMobile ? 'md:block hidden ml-0.5' : 'ml-0.5'}>{text}</span>
    </button>
  );
};
