// src/features/menus/components/MenuItem/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu } from '../../interfaces/menuInterface';
import { styles } from './Style';

interface MenuItemProps {
  menu: Menu;
  onPress?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ menu, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{menu.name}</Text>
        <Text style={styles.date}>
          {new Date(menu.date).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.itemsContainer}>
        {menu.items.map((item) => (
          <View key={item.id} style={styles.item}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;