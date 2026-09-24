import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ReservationStackParamList } from '../../../../navigation/types';
import useMessages from '../../hooks/useMessages';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { useClasses } from '../hooks/useClasses';
import styles from './Style';

type Navigation = NativeStackNavigationProp<ReservationStackParamList, 'ClassesProfessionals'>;
type Route = RouteProp<ReservationStackParamList, 'ClassesProfessionals'>;

/**
 * Pantalla 3 del flujo: profesionales de la disciplina elegida.
 * Sólo se muestran los activos; un profesional inactivo deja de aparecer sin
 * que se borre su historial (§11, criterios de aceptación).
 */
const ProfessionalsScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Route>();
  const { messages } = useMessages();
  const { getDisciplineById, getProfessionalsByDiscipline } = useClasses();

  const discipline = getDisciplineById(params.disciplineId);
  const professionals = getProfessionalsByDiscipline(params.disciplineId);
  const disciplineName = discipline ? discipline.name : '';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>
          {messages.CLASSES.PROFESSIONALS_OF} {disciplineName}
        </Text>

        {professionals.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>{messages.CLASSES.NO_PROFESSIONALS}</Text>
          </View>
        ) : (
          professionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              professional={professional}
              disciplineName={disciplineName}
              actionLabel={messages.CLASSES.VIEW_SCHEDULES}
              onPress={() =>
                navigation.navigate('ClassesSchedule', {
                  disciplineId: params.disciplineId,
                  professionalId: professional.id,
                })
              }
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfessionalsScreen;
