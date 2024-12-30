import styled, { css } from "styled-components/native";
import { ButtonSize, ButtonStyleType } from "./Button.types";

const sizes: Record<ButtonSize, string> = {
  long: "width: 355px; height: 43px;",
  large: "width: 284px; height: 56px;",
  medium: "width: 175px; height: 50px;",
  small: "width: 129px; height: 58px;",
};

const types: Record<ButtonStyleType, any> = {
  default: css`
    background-color: #ffffff;
    box-shadow: 0px 4px #000000;
  `,
  primary: css`
    background-color: #0a85eb;
    box-shadow: 0px 4px #000000;
  `,
  danger: css`
    background-color: #f22125;
    box-shadow: 0px 4px #000000;
  `,
  empty: css`
    background-color: transparent;
    box-shadow: 0px 4px #000000;
    border: 1px solid #0a85eb;
    color: #0a85eb;
  `,
};

export const StyledButton = styled.TouchableHighlight<{
  size: ButtonSize;
  styleType: ButtonStyleType;
}>`
  ${({ size }) => sizes[size] || sizes.medium}
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  ${({ styleType }) => types[styleType] || types.default}
`;

export const ButtonText = styled.Text<{
  styleType: ButtonStyleType;
  size: ButtonSize;
}>`
  font-size: ${({ size }) =>
    size === "small" ? "20px" : size === "long" ? "14px" : "24px"};
  font-weight: bold;
  color: ${({ styleType }) =>
    styleType === "empty"
      ? "#0a85eb"
      : styleType === "default"
      ? "#000000"
      : "#FFFFFF"};
`;
