import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { styles } from './Style';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: object;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  numberOfLines?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  style,
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.errorInput, multiline && styles.multilineInput]}
        placeholder={placeholder}
        placeholderTextColor={styles.inputPlaceholder?.color || '#999'}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;
