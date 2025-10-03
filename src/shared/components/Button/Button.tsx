import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { styles } from './Style'

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  variant?: 'filled' | 'outline' | 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  style,
  containerStyle,
  titleStyle,
  variant = 'primary',
  disabled = false,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'danger':
        return styles.dangerButton;
      case 'filled':
        return styles.filledButton;
      default:
        return styles.primaryButton;
    }
  };

  const getVariantTitleStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineButtonText;
      case 'secondary':
        return styles.secondaryButtonText;
      case 'danger':
        return styles.dangerButtonText;
      case 'filled':
        return styles.filledButtonText;
      default:
        return styles.primaryButtonText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        disabled && styles.disabledButton,
        style,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, getVariantTitleStyle(), titleStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;