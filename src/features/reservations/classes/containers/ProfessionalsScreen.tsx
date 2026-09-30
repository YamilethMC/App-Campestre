import { RouteProp, useNavigation, useRoute } from 'expo-router/react-navigation';
import { NativeStackNavigationProp } from 'expo-router/native-stack';
import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ReservationStackParamList } from '../../../../navigation/types';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { useProfessionals } from '../hooks/useClasses';
import styles from './Style';

type Navigation = NativeStackNavigationProp<ReservationStackParamList, 'ClassesProfessionals'>;
type Route = RouteProp<ReservationStackParamList, 'ClassesProfessionals'>;

/**
 * Pantalla 3 del flujo: profesionales de la disciplina elegida.
 *
 * El backend devuelve sólo los activos: uno inactivo deja de mostrarse sin que
 * se borre su historial (§11). Una lista vacía significa que el Club todavía no
 * ha entregado los maestros de esa disciplina (§10).
 */
const ProfessionalsScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Route>();
  const { messages } = useMessages();
  const { professionals, loading } = useProfessionals(params.disciplineId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>
          {messages.CLASSES.PROFESSIONALS_OF} {params.disciplineName}
        </Text>

        {loading ? (
          <ActivityIndicator style={styles.loader} color={COLORS.primary} />
        ) : professionals.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>{messages.CLASSES.NO_PROFESSIONALS}</Text>
          </View>
        ) : (
          professionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              disciplineName={professional.discipline.name}
              actionLabel={messages.CLASSES.VIEW_SCHEDULES}
              onPress={() =>
                navigation.navigate('ClassesSchedule', { professionalId: professional.id })
              }
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfessionalsScreen;
