import { useNavigation } from 'expo-router/react-navigation';
import { NativeStackNavigationProp } from 'expo-router/native-stack';
import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ReservationStackParamList } from '../../../../navigation/types';
import { COLORS } from '../../../../shared/theme/colors';
import { ServiceCard } from '../../components/ServiceCard';
import useMessages from '../../hooks/useMessages';
import { useDisciplines } from '../hooks/useClasses';
import styles from './Style';

type Navigation = NativeStackNavigationProp<ReservationStackParamList, 'ClassesDisciplines'>;

/**
 * Pantalla 2 del flujo: selección de disciplina.
 *
 * Reutiliza ServiceCard, la misma tarjeta de "Nueva Reservación", para que la
 * cuadrícula se vea idéntica a la del módulo actual (§11).
 *
 * El backend sólo devuelve las disciplinas que el Club está ofreciendo. Que una
 * no tenga profesionales se descubre en la pantalla siguiente, que lo dice con
 * todas sus letras: una tarjeta apagada no le explicaría nada al socio.
 */
const DisciplinesScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { messages } = useMessages();
  const { disciplines, loading } = useDisciplines();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{messages.CLASSES.SELECT_DISCIPLINE}</Text>

        {loading ? (
          <ActivityIndicator style={styles.loader} color={COLORS.primary} />
        ) : disciplines.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>{messages.CLASSES.NO_DISCIPLINES}</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {disciplines.map((discipline) => (
              <ServiceCard
                key={discipline.id}
                service={{
                  id: String(discipline.id),
                  name: discipline.name,
                  description: '',
                  icon: discipline.icon,
                  color: COLORS.primary,
                }}
                onPress={() =>
                  navigation.navigate('ClassesProfessionals', {
                    disciplineId: discipline.id,
                    disciplineName: discipline.name,
                  })
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisciplinesScreen;
