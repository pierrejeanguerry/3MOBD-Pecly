import styled, { css } from "styled-components/native";
import { ButtonSize, ButtonStyleType } from "./Button.types";
import { theme } from "@/styles/theme";

const sizes: Record<ButtonSize, string> = {
  long: "width: 355px; height: 43px;",
  large: "width: 284px; height: 56px;",
  medium: "width: 200px; height: 50px;",
  small: "width: 129px; height: 58px;",
};

const types: Record<ButtonStyleType, any> = {
  default: css`
    background-color: #ffffff;
    box-shadow: 0 4px #000000;
  `,
  primary: css`
    background-color: #0a85eb;
    box-shadow: 0 4px #000000;
  `,
  danger: css`
    background-color: #f22125;
    box-shadow: 0 4px #000000;
  `,
  empty: css`
    background-color: transparent;
    box-shadow: 0 4px #000000;
    border: 1px solid #0a85eb;
    color: #0a85eb;
  `,
};

export const StyledButton = styled.TouchableOpacity<{
  size: ButtonSize;
  styleType: ButtonStyleType;
  disabled?: boolean;
}>`
  ${({ size }: { size: ButtonSize }) => sizes[size] || sizes.medium}
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  ${({ styleType }: { styleType: ButtonStyleType }) =>
    types[styleType] || types.default}
  ${({ disabled }: { disabled?: boolean }) =>
    disabled && "opacity: 0.5; pointer-events: none;"}
`;

export const ButtonText = styled.Text<{
  styleType: ButtonStyleType;
  size: ButtonSize;
}>`
  font-size: ${({ size }: { size: ButtonSize }) =>
    size === "small" ? "20px" : size === "long" ? "14px" : "24px"};
  font-weight: bold;
  color: ${({ styleType }: { styleType: ButtonStyleType }) =>
    styleType === "empty"
      ? "#0a85eb"
      : styleType === "default"
      ? theme.colors.backgroundPrimary
      : "#FFFFFF"};
`;
