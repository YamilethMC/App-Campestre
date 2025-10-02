import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../theme/colors';

interface CardProps {
  children: React.ReactNode;
  style?: object;
  padding?: number;
  margin?: number;
  borderRadius?: number;
  backgroundColor?: string;
  elevation?: number;
  shadowColor?: string;
  onPress?: () => void;
  borderColor?: string;
  borderWidth?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 16,
  margin = 0,
  borderRadius = 8,
  backgroundColor = COLORS.white,
  elevation = 2,
  shadowColor = COLORS.gray800,
  onPress,
  borderColor = 'transparent',
  borderWidth = 0,
}) => {
  const cardStyle = [
    styles.card,
    {
      padding,
      margin,
      borderRadius,
      backgroundColor,
      elevation,
      borderColor,
      borderWidth,
    },
    {
      shadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
});

export default Card;