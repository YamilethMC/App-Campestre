import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.primary,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
  },
  cardsContainer: {
    padding: 16,
    marginTop: -20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.gray800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 12,
  },
});

export default HomeScreen;
