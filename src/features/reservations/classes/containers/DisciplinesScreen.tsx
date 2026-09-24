import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ReservationStackParamList } from '../../../../navigation/types';
import { COLORS } from '../../../../shared/theme/colors';
import { ServiceCard } from '../../components/ServiceCard';
import useMessages from '../../hooks/useMessages';
import { useClasses } from '../hooks/useClasses';
import styles from './Style';

type Navigation = NativeStackNavigationProp<ReservationStackParamList, 'ClassesDisciplines'>;

/**
 * Pantalla 2 del flujo: selección de disciplina.
 *
 * Reutiliza ServiceCard, la misma tarjeta de "Nueva Reservación", para que la
 * cuadrícula se vea idéntica a la del módulo actual (§11: "El diseño reutiliza
 * componentes, tipografía, encabezados, tarjetas y navegación de la app actual").
 *
 * Se muestran TODAS las disciplinas activas y todas se pueden tocar, incluidas
 * las que aún no tienen profesionales (hoy Tenis y GYM). En ese caso la pantalla
 * siguiente lo dice con todas sus letras en vez de dejar la tarjeta muerta, que
 * no explicaría nada al socio.
 */
const DisciplinesScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { messages } = useMessages();
  const { getDisciplines } = useClasses();

  const disciplines = getDisciplines();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{messages.CLASSES.SELECT_DISCIPLINE}</Text>

        {disciplines.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>{messages.CLASSES.NO_DISCIPLINES}</Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {disciplines.map((discipline) => (
              <ServiceCard
                key={discipline.id}
                service={{
                  id: discipline.id,
                  name: discipline.name,
                  description: '',
                  icon: discipline.icon,
                  color: COLORS.primary,
                }}
                onPress={() =>
                  navigation.navigate('ClassesProfessionals', { disciplineId: discipline.id })
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
