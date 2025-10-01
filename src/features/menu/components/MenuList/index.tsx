// src/features/menus/components/MenuList/index.tsx
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import useMessages from '../../hooks/useMessages';
import { Menu } from '../../interfaces/menuInterface';
import MenuItem from '../MenuItem';
import { styles } from './Style';

interface MenuListProps {
  menus: Menu[];
  onPressItem?: (menu: Menu) => void;
  emptyMessage?: string;
}

const MenuList: React.FC<MenuListProps> = ({ menus, onPressItem, emptyMessage }) => {
  const { messages } = useMessages();

  if (menus.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage || messages.CONTAINER.NO_MENUS_AVAILABLE}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={menus}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <MenuItem menu={item} onPress={() => onPressItem?.(item)} />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default MenuList;