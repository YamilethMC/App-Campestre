// src/features/menus/components/MenuTypeTabs/index.tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useMessages from '../../hooks/useMessages';
import { styles } from './Style';

interface MenuTypeTabsProps {
  selectedType: 'daily' | 'weekly' | 'special';
  onSelectType: (type: 'daily' | 'weekly' | 'special') => void;
}

const MenuTypeTabs: React.FC<MenuTypeTabsProps> = ({ selectedType, onSelectType }) => {
  const { messages } = useMessages();

  const types = [
    { id: 'daily', label: messages.CONTAINER.TYPES.DAILY },
    { id: 'weekly', label: messages.CONTAINER.TYPES.WEEKLY },
    { id: 'special', label: messages.CONTAINER.TYPES.SPECIAL },
  ] as const;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{messages.CONTAINER.SELECT_MENU_TYPE}</Text>
      <View style={styles.tabsContainer}>
        {types.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[styles.tab, selectedType === type.id && styles.activeTab]}
            onPress={() => onSelectType(type.id)}
          >
            <Text style={[styles.tabText, selectedType === type.id && styles.activeTabText]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MenuTypeTabs;