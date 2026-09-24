import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { ReservationStackParamList } from '../../../../navigation/types';
import Button from '../../../../shared/components/Button/Button';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import useMessages from '../../hooks/useMessages';
import { ClassSummary } from '../components/ClassSummary';
import { useClasses } from '../hooks/useClasses';
import { useClassBookingStore } from '../store/useClassBookingStore';
import styles from './Style';

type Navigation = NativeStackNavigationProp<ReservationStackParamList, 'ClassesConfirm'>;
type Route = RouteProp<ReservationStackParamList, 'ClassesConfirm'>;

/**
 * Pantalla 5 del flujo: resumen y confirmación.
 *
 * El resumen usa ClassSummary, que sigue el diseño entregado (ícono en círculo,
 * etiqueta arriba y valor abajo); el SummaryCard de Reservas tiene otra estructura
 * y se deja intacto. El precio se guarda congelado en la reserva (price_snapshot,
 * §9) para que un cambio de tarifa posterior no altere lo ya reservado. Al
 * confirmar, la clase queda registrada y su horario deja de ofrecerse.
 */
const ConfirmScreen = () => {
  const navigation = useNavigation<Navigation>();
  const { params } = useRoute<Route>();
  const { messages } = useMessages();
  const { getDisciplineById, getProfessionalById, getPrice } = useClasses();
  const addBooking = useClassBookingStore((state) => state.addBooking);

  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  const discipline = getDisciplineById(params.disciplineId);
  const professional = getProfessionalById(params.professionalId);
  const price = getPrice(params.partySize);

  const disciplineName = discipline ? discipline.name : '';
  const professionalName = professional ? professional.displayName : '';

  const handleConfirm = () => {
    addBooking({
      id: `${params.professionalId}-${params.date}-${params.startTime}`,
      disciplineId: params.disciplineId,
      disciplineName,
      professionalId: params.professionalId,
      professionalName,
      date: params.date,
      startTime: params.startTime,
      partySize: params.partySize,
      priceSnapshot: price,
      createdAt: new Date().toISOString(),
    });
    setShowConfirmationModal(true);
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
          disciplineName={disciplineName}
          professionalName={professionalName}
          date={params.date}
          startTime={params.startTime}
          partySize={params.partySize}
          price={price}
        />

        <View style={styles.actionContainer}>
          <Button text={messages.CLASSES.CONFIRM_RESERVATION} onPress={handleConfirm} />
        </View>

        <ConfirmationModal visible={showConfirmationModal} onClose={handleCloseModal} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmScreen;
