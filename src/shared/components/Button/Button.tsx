import React from 'react';
import { TouchableOpacity, Text, View, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { styles } from './Style'

interface ButtonProps {
  text?: string;
  title?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>; // Alias for style, for backward compatibility
  titleStyle?: StyleProp<TextStyle>;
  variant?: 'filled' | 'outline' | 'primary' | 'secondary' | 'danger' | 'icon';
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  text,
  title,
  onPress,
  style,
  containerStyle,
  titleStyle,
  variant = 'primary',
  disabled = false,
  icon,
  iconPosition = 'left',
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
      case 'icon':
        return styles.iconButton;
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
      case 'icon':
        return styles.iconButtonText;
      default:
        return styles.primaryButtonText;
    }
  };

  // Combine both style props for backward compatibility
  const combinedStyles = [styles.button, getVariantStyle(), disabled && styles.disabledButton, containerStyle, style];

  return (
    <TouchableOpacity
      style={combinedStyles}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.buttonContent}>
        {icon && iconPosition === 'left' && icon}
        {(text || title) && (
          <Text style={[styles.buttonText, getVariantTitleStyle(), titleStyle]}>
            {text || title}
          </Text>
        )}
        {icon && iconPosition === 'right' && icon}
      </View>
    </TouchableOpacity>
  );
};

export default Button;