// src/features/menu/containers/index.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Text, View } from 'react-native';
import Search from '../../../shared/components/Search/Search';
import { COLORS } from '../../../shared/theme/colors';
import MenuCard from '../components/MenuCard';
import MenuFilter from '../components/MenuFilter';
import MenuHeader from '../components/MenuHeader';
import RestaurantHours from '../components/RestaurantHours';
import useMessages from '../hooks/useMessages';
import { styles } from './Style';

interface Menu {
  id: string;
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'drinks' | 'specials';
  uploadDate: string;
  fileSize: string;
  rating: number;
  isFeatured: boolean;
  image?: string;
}

const MenuContainer: React.FC = () => {
  const { t } = useTranslation();

  const { messages } = useMessages();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for menus
  const allMenus: Menu[] = [
    {
      id: '1',
      name: t('menu.menu1.name', 'Menú Desayuno Ejecutivo'),
      description: t(
        'menu.menu1.description',
        'Opciones nutritivas para comenzar el día con energía',
      ),
      category: 'breakfast',
      uploadDate: '15 Mar 2025',
      fileSize: '2.3 MB',
      rating: 4.8,
      isFeatured: true,
    },
    {
      id: '2',
      name: t('menu.menu2.name', 'Menú Desayuno Familiar'),
      description: t('menu.menu2.description', 'Platos principales elaborados por nuestros chefs'),
      category: 'breakfast',
      uploadDate: '14 Mar 2025',
      fileSize: '3.1 MB',
      rating: 4.5,
      isFeatured: false,
    },
    {
      id: '3',
      name: t('menu.menu3.name', 'Menú Almuerzo Ejecutivo'),
      description: t(
        'menu.menu3.description',
        'Comida completa con entrada, plato principal y postre',
      ),
      category: 'lunch',
      uploadDate: '15 Mar 2025',
      fileSize: '2.7 MB',
      rating: 4.7,
      isFeatured: true,
    },
    {
      id: '4',
      name: t('menu.menu4.name', 'Menú Cena Romántica'),
      description: t('menu.menu4.description', 'Experiencia culinaria especial para compartir'),
      category: 'dinner',
      uploadDate: '13 Mar 2025',
      fileSize: '2.9 MB',
      rating: 4.9,
      isFeatured: true,
    },
    {
      id: '5',
      name: t('menu.menu5.name', 'Menú Bebidas Premium'),
      description: t('menu.menu5.description', 'Amplia variedad de bebidas artesanales'),
      category: 'drinks',
      uploadDate: '12 Mar 2025',
      fileSize: '1.8 MB',
      rating: 4.6,
      isFeatured: false,
    },
    {
      id: '6',
      name: t('menu.menu6.name', 'Menú Especial Fin de Semana'),
      description: t(
        'menu.menu6.description',
        'Selección especial de platos disponibles solo los fines de semana',
      ),
      category: 'specials',
      uploadDate: '10 Mar 2025',
      fileSize: '3.5 MB',
      rating: 4.8,
      isFeatured: true,
    },
    {
      id: '7',
      name: t('menu.menu7.name', 'Menú Light'),
      description: t('menu.menu7.description', 'Opciones saludables y bajas en calorías'),
      category: 'lunch',
      uploadDate: '09 Mar 2025',
      fileSize: '2.2 MB',
      rating: 4.4,
      isFeatured: false,
    },
    {
      id: '8',
      name: t('menu.menu8.name', 'Menú Degustación'),
      description: t('menu.menu8.description', 'Selección de nuestros platos más representativos'),
      category: 'specials',
      uploadDate: '08 Mar 2025',
      fileSize: '3.0 MB',
      rating: 4.9,
      isFeatured: true,
    },
  ];

  // Calculate menu counts for each category based on search query
  const menuCounts = {
    all: allMenus.filter(
      menu =>
        searchQuery === '' ||
        menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        menu.description.toLowerCase().includes(searchQuery.toLowerCase()),
    ).length,
    breakfast: allMenus.filter(
      menu =>
        menu.category === 'breakfast' &&
        (searchQuery === '' ||
          menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          menu.description.toLowerCase().includes(searchQuery.toLowerCase())),
    ).length,
    lunch: allMenus.filter(
      menu =>
        menu.category === 'lunch' &&
        (searchQuery === '' ||
          menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          menu.description.toLowerCase().includes(searchQuery.toLowerCase())),
    ).length,
    dinner: allMenus.filter(
      menu =>
        menu.category === 'dinner' &&
        (searchQuery === '' ||
          menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          menu.description.toLowerCase().includes(searchQuery.toLowerCase())),
    ).length,
    drinks: allMenus.filter(
      menu =>
        menu.category === 'drinks' &&
        (searchQuery === '' ||
          menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          menu.description.toLowerCase().includes(searchQuery.toLowerCase())),
    ).length,
    specials: allMenus.filter(
      menu =>
        menu.category === 'specials' &&
        (searchQuery === '' ||
          menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          menu.description.toLowerCase().includes(searchQuery.toLowerCase())),
    ).length,
  };

  // Filter menus based on selected category and search query
  const filteredMenus = allMenus.filter(menu => {
    const matchesCategory = selectedFilter === 'all' || menu.category === selectedFilter;
    const matchesSearch =
      menu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      menu.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Menu Header */}
        <MenuHeader
          menuCount={allMenus.length}
          onDownloadPress={() =>
            Alert.alert(
              t('menu.downloadAllTitle', 'Descargar todos los menús'),
              t('menu.notImplemented', 'Funcionalidad no implementada aún.'),
            )
          }
        />

        {/* Search */}
        <Search
          placeholder={messages.CONTAINER.PLACEHOLDER}
          onSearch={setSearchQuery}
          iconColor={COLORS.gray500}
          inputStyle={styles.searchInput}
        />

        {/* Filters */}
        <MenuFilter
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
          counts={menuCounts}
        />

        {/* All Menus - including featured ones with tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{messages.CONTAINER.ALLMENUS}</Text>
          {filteredMenus.length > 0 ? (
            filteredMenus.map(menu => (
              <MenuCard
                key={menu.id}
                menu={menu}
                onDownloadPress={() =>
                  Alert.alert(
                    t('menu.downloadTitle', 'Descargar menú'),
                    t('menu.notImplemented', 'Funcionalidad no implementada aún.'),
                  )
                }
                onViewPress={() =>
                  Alert.alert(
                    t('menu.viewTitle', 'Ver menú'),
                    t('menu.notImplemented', 'Funcionalidad no implementada aún.'),
                  )
                }
              />
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>{messages.CONTAINER.NOMENUSAVAILABLE}</Text>
            </View>
          )}
        </View>

        {/* Restaurant Hours */}
        <RestaurantHours />
      </View>
    </ScrollView>
  );
};

export default MenuContainer;
