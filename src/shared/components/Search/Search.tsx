import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { styles } from './Style';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceTime?: number;
  style?: object;
  inputStyle?: object;
  iconColor?: string;
  showClearButton?: boolean;
  autoFocus?: boolean;
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Buscar...',
  onSearch,
  debounceTime = 300,
  style,
  inputStyle,
  iconColor = '#718096',
  showClearButton = true,
  autoFocus = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceTime, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <View style={[styles.container, style]}>
      <View 
        style={[
          styles.searchContainer, 
          isFocused && styles.searchContainerFocused,
          inputStyle
        ]}
      >
        <Icon name="search" size={20} color={iconColor} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A0AEC0"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus={autoFocus}
          returnKeyType="search"
          clearButtonMode="never"
        />
        {showClearButton && searchTerm.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Icon name="close" size={20} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Search;
