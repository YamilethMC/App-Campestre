import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import styles from './Style';

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      >
      <View style={styles.header}>
        <Text style={styles.title}>{t('home.welcome')}</Text>
        <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
      </View>
      
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('home.quickActions')}</Text>
          {/* Contenido de la tarjeta */}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
