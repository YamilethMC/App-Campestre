// src/features/account-statements/hooks/index.ts
import * as Sharing from 'expo-sharing';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import { useProfileStore } from '../../profile/store/useProfileStore';
import { accountStatementService } from '../services';
import { useAccountStatementStore } from '../store';

export const useAccountStatements = () => {
  const { profile } = useProfileStore();
  const [selectedStatement, setSelectedStatement] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [statements, setStatements] = useState<any[]>([]);
  const { 
    // statements, 
    filteredStatements, 
    loading, 
    error,
    // setStatements,
    setLoading,
    setError
  } = useAccountStatementStore();

  const formatDateRange = (startDate: Date, endDate: Date) => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Format: "Ene 2023" (abbreviated month name in Spanish + year)
    const formatOptions: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      year: 'numeric' 
    };

    // Helper function to format and capitalize first letter
    const formatAndCapitalize = (date: Date) => {
      const formatted = date.toLocaleDateString('es-MX', formatOptions);
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };

    const startFormatted = formatAndCapitalize(start);
    const endFormatted = formatAndCapitalize(end);

    // If same month and year, return just one date
    if (startFormatted === endFormatted) {
      return startFormatted;
    }

    // Otherwise return range
    return `${startFormatted} - ${endFormatted}`;
  } catch (error) {
    return `${startDate} - ${endDate}`; // Fallback to original format if there's an error
  }
};

  const fetchStatements = useCallback(async () => {
    if (!profile?.id) return;

    setLoading(true);
    const response = await accountStatementService.getAccountStatements(parseInt(profile.id));

    if (response.success && response.data) {
      const statementsArray = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      // Process each statement
      const formattedStatements = statementsArray.map((statement: any) => ({
        ...statement,
        period: formatDateRange(statement.periodStart, statement.periodEnd)
      }));

      setStatements(formattedStatements);
    } else {
      // Verificar si es un error de autenticación
      if (response.status === 401) {
        // No mostramos alerta aquí porque el servicio ya la maneja
        return;
      }
      Alert.alert('Error', response.error || 'Error al cargar los estados de cuenta');
    }

    setLoading(false);
  }, [profile?.id, setStatements, setLoading, setError]);

  // Cargar al montar el componente
  useEffect(() => {
    fetchStatements();
  }, [fetchStatements]);

  
  const handleCardPress = async (statement: any) => {
    const response = await accountStatementService.getAccountStatementById(statement.id);

    if (response.success && response.data) {
      setSelectedStatement(response.data);
      setShowDetail(true);
    } else {
      // Verificar si es un error de autenticación
      if (response.status === 401) {
        // No mostramos alerta aquí porque el servicio ya la maneja
        return;
      }
      Alert.alert('Error', response.error || 'Error al cargar el estado de cuenta');
    }
  };

  const handleDownload = async (statement: any) => {
    setLoading?.(true);

    // 1. Obtener la URL firmada del servidor
    const response = await accountStatementService.downloadAccountStatement(statement.id);

    if (response.success && response.data) {
      // La respuesta ya es la URL directa al PDF
      let downloadUrl: string | any = response.data;

      // Si la respuesta es un objeto, intentar extraer la URL
      if (typeof response.data === 'object' && response.data !== null) {
        downloadUrl = (response.data as any)?.signedUrl || response.data;
      }

      if (!downloadUrl) {
        Alert.alert('Error', "No se pudo obtener la URL de descarga del estado de cuenta");
        setLoading?.(false);
        return;
      }

      // 2. Verificar si se puede abrir la URL directamente
      const supported = await Linking.canOpenURL(downloadUrl);
      if (supported) {
        await Linking.openURL(downloadUrl);
      } else {
        // 3. Si no se puede abrir directamente, intentar compartir
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(downloadUrl, {
            mimeType: 'application/pdf',
            dialogTitle: `Compartir ${statement.fileName || 'documento'}`,
            UTI: 'com.adobe.pdf'
          });
        } else {
          Alert.alert('Error', 'No se pudo abrir el archivo');
        }
      }
    } else {
      // Verificar si es un error de autenticación
      if (response.status === 401) {
        // No mostramos alerta aquí porque el servicio ya la maneja
        setLoading?.(false);
        return;
      }
      Alert.alert('Error', response.error || 'No se pudo abrir el archivo. Por favor, inténtalo de nuevo más tarde.');
    }

    setLoading?.(false);
  };

  return {
    statements,
    filteredStatements,
    loading,
    error,
    fetchStatements,
    selectedStatement,
    setSelectedStatement,
    setStatements,
    handleCardPress,
    showDetail,
    setShowDetail,
    handleDownload
  };
};