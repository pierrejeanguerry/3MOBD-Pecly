import React from "react";
import { ButtonSize, ButtonStyleType } from "./Button.types";
import { StyledButton, ButtonText } from "./Button.styles";

interface ButtonProps {
  size?: ButtonSize;
  styleType?: ButtonStyleType;
  onPress: () => void;
  isDisabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  styleType = "default",
  children,
  isDisabled = false,
  onPress,
}) => {
  return (
    <StyledButton
      size={size}
      styleType={styleType}
      onPress={onPress}
      disabled={isDisabled}
    >
      <ButtonText size={size} styleType={styleType}>
        {children}
      </ButtonText>
    </StyledButton>
  );
};

export default Button;
