import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import HelpCenterHeader from '../components/HelpCenterHeader';
import FAQList from '../components/FAQList';
import { useHelpCenterActions } from '../hooks/useHelpCenterActions';
import styles from './Style';

const HelpCenterContainer: React.FC = () => {
  const { faqs, loading, error } = useHelpCenterActions();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HelpCenterHeader
          title="Centro de Ayuda"
          description="Encuentra respuestas a las preguntas más frecuentes"
          icon="help-circle-outline"
        />

        <View style={styles.contentContainer}>
          {faqs.length > 0 ? (
            <FAQList faqs={faqs} />
          ) : loading ? (
            <View style={styles.loadingContainer}>
              <Text>Cargando preguntas frecuentes...</Text>
            </View>
          ) : (
            <View style={styles.noFAQsContainer}>
              <Text style={styles.noFAQsText}>No se encontraron preguntas frecuentes</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpCenterContainer;
