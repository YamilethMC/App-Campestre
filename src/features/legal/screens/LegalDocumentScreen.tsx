import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { legalService, PendingDocument } from '../services/legalService';
import { COLORS } from '../../../shared/theme/colors';

export const LegalDocumentScreen: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [pendingDocuments, setPendingDocuments] = useState<PendingDocument[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [documentContent, setDocumentContent] = useState<string>('');

  useEffect(() => {
    loadPendingDocuments();
  }, []);

  useEffect(() => {
    if (pendingDocuments.length > 0 && currentIndex < pendingDocuments.length) {
      loadDocumentContent(pendingDocuments[currentIndex].slug);
    }
  }, [currentIndex, pendingDocuments]);

  const loadPendingDocuments = async () => {
    setLoading(true);
    const result = await legalService.getUserLegalStatus();

    if (result.success && result.data) {
      if (result.data.hasPendingDocuments) {
        setPendingDocuments(result.data.pendingDocuments);
      } else {
        navigation.navigate('Home' as never);
      }
    } else {
      Alert.alert('Error', result.error || 'No se pudo cargar los documentos');
    }
    setLoading(false);
  };

  const loadDocumentContent = async (slug: string) => {
    const result = await legalService.getLatestVersion(slug);

    if (result.success && result.data) {
      setDocumentContent(result.data.content);
    } else {
      Alert.alert('Error', result.error || 'No se pudo cargar el contenido del documento');
    }
  };

  const handleAccept = async () => {
    const currentDoc = pendingDocuments[currentIndex];
    setAccepting(true);

    const result = await legalService.acceptDocument(currentDoc.versionId);

    if (result.success) {
      if (currentIndex < pendingDocuments.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        Alert.alert('Completado', 'Has aceptado todos los documentos legales necesarios', [
          {
            text: 'Continuar',
            onPress: () => navigation.navigate('Home' as never),
          },
        ]);
      }
    } else {
      Alert.alert('Error', result.error || 'No se pudo aceptar el documento');
    }

    setAccepting(false);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Cargando documentos...</Text>
      </View>
    );
  }

  if (pendingDocuments.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noDocumentsText}>No hay documentos pendientes</Text>
      </View>
    );
  }

  const currentDoc = pendingDocuments[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{currentDoc.title}</Text>
        <Text style={styles.version}>Versión {currentDoc.version}</Text>
        <Text style={styles.progress}>
          Documento {currentIndex + 1} de {pendingDocuments.length}
        </Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.content}>{documentContent}</Text>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.requiredText}>
          Debes aceptar este documento para continuar usando la aplicación
        </Text>
        <TouchableOpacity
          style={[styles.acceptButton, accepting && styles.acceptButtonDisabled]}
          onPress={handleAccept}
          disabled={accepting}
        >
          {accepting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.acceptButtonText}>Acepto los {currentDoc.title}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
  },
  progress: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  requiredText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  acceptButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonDisabled: {
    opacity: 0.6,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  noDocumentsText: {
    fontSize: 16,
    color: '#666',
  },
});
