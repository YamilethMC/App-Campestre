import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../shared/theme/colors';
import styles from './Style';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  placeholder = 'Buscar notificaciones...' 
}) => {
  return (
    <View style={styles.container}>
      <Ionicons 
        name="search" 
        size={20} 
        color={COLORS.gray500} 
        style={styles.searchIcon} 
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray500}
      />
    </View>
  );
};

export default SearchBar;