import React from "react";
import { ButtonSize, ButtonStyleType } from "./Button.types";
import { StyledButton, ButtonText } from "./Button.styles";

interface ButtonProps {
  size?: ButtonSize;
  styleType?: ButtonStyleType;
  onPress: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  styleType = "default",
  children,
  onPress,
}) => {
  return (
    <StyledButton size={size} styleType={styleType} onPress={onPress}>
      <ButtonText size={size} styleType={styleType}>
        {children}
      </ButtonText>
    </StyledButton>
  );
};

export default Button;
