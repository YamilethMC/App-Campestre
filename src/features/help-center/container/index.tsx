import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FAQList from '../components/FAQList';
import HelpCenterHeader from '../components/HelpCenterHeader';
import { useHelpCenterActions } from '../hooks/useHelpCenterActions';
import styles from './Style';

const HelpCenterContainer: React.FC = () => {

  const {
    faqs,
    loading,
    error
  } = useHelpCenterActions();

  const handleWhatsappPress = async () => {
    const phoneNumber = '52667';
    const url = `https://wa.me/${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.warn('No se pudo abrir WhatsApp:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <HelpCenterHeader
          title="Centro de Ayuda"
          description="Encuentra respuestas a las preguntas más frecuentes"
          icon="help-circle-outline"
        />

        <TouchableOpacity style={styles.whatsappCard} onPress={handleWhatsappPress} activeOpacity={0.9}>
          <View style={styles.whatsappContent}>
            <View style={styles.whatsappTextBlock}>
              <Text style={styles.whatsappTitle}>¿Necesitas ayuda inmediata?</Text>
              <Text style={styles.whatsappSubtitle}>Chatea con nosotros por WhatsApp</Text>
            </View>
          </View>
          <View style={styles.whatsappCTAGroup}>
            <View style={styles.whatsappIconWrapper}>
              <Ionicons name="logo-whatsapp" size={30} color="#0bba4bff" />
            </View>
          </View>
        </TouchableOpacity>

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