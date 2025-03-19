import { IconProps } from "./Icon.types";

export interface ActionButtonProps {
  text?: string;
  click: () => void;
  Icon?: React.FC<IconProps>;
  iconWidth?: string;
  iconHeight?: string;
  iconColor?: string;
  color?: string;
  width?: string;
  height?: string;
  hasBackground?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  hoverColor?: string;
  rounded?: boolean;
}
