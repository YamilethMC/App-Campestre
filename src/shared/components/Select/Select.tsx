import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { styles } from './Style';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  selectedValue?: string | number | null;
  onValueChange: (value: string | number) => void;
  error?: string;
  style?: object;
  dropdownStyle?: object;
  itemStyle?: object;
  itemTextStyle?: object;
  placeholderTextColor?: string;
  iconColor?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Selecciona una opción',
  options,
  selectedValue,
  onValueChange,
  error,
  style,
  dropdownStyle,
  itemStyle,
  itemTextStyle,
  placeholderTextColor = '#A0AEC0',
  iconColor = '#4A5568',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const selectedOption = options.find(option => option.value === selectedValue);

  const handleSelect = (value: string | number) => {
    onValueChange(value);
    setIsVisible(false);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.selectContainer, error && styles.errorInput]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={[styles.selectedText, !selectedValue && { color: placeholderTextColor }]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Icon name="arrow-drop-down" size={24} color={iconColor} />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={[styles.dropdown, dropdownStyle]}>
            <FlatList
              data={options}
              keyExtractor={item => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.item, itemStyle]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={[styles.itemText, itemTextStyle]}>{item.label}</Text>
                  {selectedValue === item.value && <Icon name="check" size={20} color="#4A90E2" />}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Select;
