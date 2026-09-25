import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, View } from 'react-native';
import { ReservationStackParamList } from '../../../../navigation/types';
import Button from '../../../../shared/components/Button/Button';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import useMessages from '../../hooks/useMessages';
import { ClassSummary } from '../components/ClassSummary';
import { PolicyNotice } from '../components/PolicyNotice';
import { useCreateBooking, useProfessional } from '../hooks/useClasses';
import styles from './Style';

type Navigation = NativeStackNavigationProp<ReservationStackParamList, 'ClassesConfirm'>;
type Route = RouteProp<ReservationStackParamList, 'ClassesConfirm'>;

/**
 * Pantalla 5 del flujo: resumen y confirmación.
 *
 * Quien decide si la reserva se puede hacer es el backend: vuelve a validar el
 * horario antes de escribir y, si otro socio se adelantó por milisegundos, la
 * base lo impide y responde 409. Aquí ese caso se le explica al socio en vez de
 * dejarlo con un error suelto.
 */
const ConfirmScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Route>();
  const { messages } = useMessages();
  const { createBooking, creating } = useCreateBooking();
  // Las reglas del Club viajan con la ficha; se enseñan antes de confirmar.
  const { policy } = useProfessional(params.professionalId);

  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  const handleConfirm = async () => {
    try {
      await createBooking({
        professionalId: params.professionalId,
        date: params.date,
        startTime: params.startTime,
        partySize: params.partySize,
      });
      setShowConfirmationModal(true);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
    // De vuelta a Reserva, donde la clase ya aparece listada.
    navigation.popToTop();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContentFlush} showsVerticalScrollIndicator={false}>
        <ClassSummary
          title={messages.CLASSES.CONFIRM_TITLE}
          labels={{
            discipline: messages.CLASSES.SUMMARY_DISCIPLINE,
            professional: messages.CLASSES.SUMMARY_PROFESSIONAL,
            date: messages.CLASSES.SUMMARY_DATE,
            time: messages.CLASSES.SUMMARY_TIME,
            people: messages.CLASSES.SUMMARY_PEOPLE,
            price: messages.CLASSES.SUMMARY_PRICE,
          }}
          personLabel={messages.CLASSES.PERSON}
          peopleLabel={messages.CLASSES.PEOPLE}
          disciplineName={params.disciplineName}
          professionalName={params.professionalName}
          date={params.date}
          startTime={params.startTime}
          partySize={params.partySize}
          price={params.price}
        />

        <PolicyNotice
          policy={policy}
          labels={{
            title: messages.CLASSES.POLICY_TITLE,
            payment: messages.CLASSES.POLICY_PAYMENT,
            cancellation: messages.CLASSES.POLICY_CANCELLATION,
            noShow: messages.CLASSES.POLICY_NO_SHOW,
            late: messages.CLASSES.POLICY_LATE,
          }}
        />

        <View style={styles.actionContainer}>
          <Button
            text={messages.CLASSES.CONFIRM_RESERVATION}
            onPress={handleConfirm}
            disabled={creating}
          />
        </View>

        <ConfirmationModal visible={showConfirmationModal} onClose={handleCloseModal} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmScreen;
