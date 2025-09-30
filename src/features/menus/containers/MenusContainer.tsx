import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import styles from './Style';

const MenusContainer = () => {
  const { menus } = useStore();
  const { t } = useTranslation();
  const [selectedMenuType, setSelectedMenuType] = useState<'daily' | 'weekly' | 'special'>('daily');

  // Filter menus by type
  const filteredMenus = menus.filter(menu => menu.type === selectedMenuType);

  const renderMenuItem = ({ item }: { item: any }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemCategory}>{item.category}</Text>
    </View>
  );

  const renderMenu = ({ item }: { item: any }) => (
    <View style={styles.menuCard}>
      <Text style={styles.menuTitle}>{item.name}</Text>
      <Text style={styles.menuDate}>
        {new Date(item.date).toLocaleDateString()}
      </Text>
      <FlatList
        data={item.items}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        style={styles.itemsList}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('menus.title')}</Text>

        {/* Menu Type Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedMenuType === 'daily' && styles.activeTab,
            ]}
            onPress={() => setSelectedMenuType('daily')}
          >
            <Text
              style={[
                styles.tabText,
                selectedMenuType === 'daily' && styles.activeTabText,
              ]}
            >
              {t('menus.dailyMenu')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              selectedMenuType === 'weekly' && styles.activeTab,
            ]}
            onPress={() => setSelectedMenuType('weekly')}
          >
            <Text
              style={[
                styles.tabText,
                selectedMenuType === 'weekly' && styles.activeTabText,
              ]}
            >
              {t('menus.weeklyMenu')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              selectedMenuType === 'special' && styles.activeTab,
            ]}
            onPress={() => setSelectedMenuType('special')}
          >
            <Text
              style={[
                styles.tabText,
                selectedMenuType === 'special' && styles.activeTabText,
              ]}
            >
              {t('menus.specialMenu')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu List */}
        <ScrollView style={styles.menuList}>
          {filteredMenus.length > 0 ? (
            filteredMenus.map(menu => (
              <View key={menu.id} style={styles.menuCard}>
                <Text style={styles.menuTitle}>{menu.name}</Text>
                <Text style={styles.menuDate}>
                  {new Date(menu.date).toLocaleDateString()}
                </Text>
                {menu.items.map((item: any) => (
                  <View key={item.id} style={styles.menuItem}>
                    <View style={styles.menuItemHeader}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>${item.price}</Text>
                    </View>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                  </View>
                ))}
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {t('menus.dailyMenu')} no disponible
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


export default MenusContainer;