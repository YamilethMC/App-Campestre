// src/features/menus/containers/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useMenus } from '../hooks/useMenus';
import MenuTypeTabs from '../components/MenuTypeTabs';
import MenuList from '../components/MenuList';
import { styles } from './Style';
import useMessages from '../hooks/useMessages';

const MenusContainer: React.FC = () => {
  const { t } = useTranslation('menus');
  const { messages } = useMessages();
  const [selectedMenuType, setSelectedMenuType] = useState<'daily' | 'weekly' | 'special'>('daily');
  const [isLoading, setIsLoading] = useState(true);
  
  const { menus, getMenusByType } = useMenus();
  const filteredMenus = getMenusByType(selectedMenuType);

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleMenuPress = (menu: any) => {
    // Navegar al detalle del menú
    console.log('Menu seleccionado:', menu);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{messages.CONTAINER.TITLE}</Text>
        
        <MenuTypeTabs
          selectedType={selectedMenuType}
          onSelectType={setSelectedMenuType}
        />
        
        <MenuList
          menus={filteredMenus}
          onPressItem={handleMenuPress}
          emptyMessage={messages.CONTAINER.NO_MENUS_FOR_TYPE}
        />
      </ScrollView>
    </View>
  );
};

export default MenusContainer;