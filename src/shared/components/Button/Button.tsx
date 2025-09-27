import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './Style'

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  titleStyle?: object;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  titleStyle,
  variant = 'primary',
  disabled = false,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'danger':
        return styles.dangerButton;
      default:
        return styles.primaryButton;
    }
  };

  const getVariantTitleStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButtonText;
      case 'danger':
        return styles.dangerButtonText;
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
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, getVariantTitleStyle(), titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;