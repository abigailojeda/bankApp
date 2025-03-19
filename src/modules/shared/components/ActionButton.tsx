import React, { useState } from 'react';
import { ActionButtonProps } from "../types/ActionButton.types";

export const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  hideTextOnMobile,
  click,
  Icon,
  iconWidth,
  iconHeight,
  iconColor,
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
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle: React.CSSProperties = {
    width, 
    height,
    color: isHovered && hoverColor ? hoverColor : color,
    backgroundColor: hasBackground
      ? isHovered && hoverBackgroundColor
        ? hoverBackgroundColor
        : backgroundColor
      : 'transparent',
    border: 'none',
    outline: 'none',
    borderRadius: rounded ? '9999px' : '4px',
    transition: 'background-color 0.3s, color 0.3s',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <button
      style={buttonStyle}
      onClick={click}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-center"
    >
      {Icon && (
        <Icon
          color={iconColor}
          width={iconWidth}
          height={iconHeight}
        />
      )}

      {text && (
        <span className={hideTextOnMobile ? 'sm:block hidden ml-0.5':'ml-0.5' } style={{ fontSize, fontWeight }}>
          {text}
        </span>
      )}
    </button>
  );
};
