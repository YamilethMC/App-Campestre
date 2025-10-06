import { useTranslation } from 'react-i18next';

const useMessages = () => {
  const { t } = useTranslation();
  const messages = {
    CONTAINER: {
      QUESTION: t('reservation.question'),
      NO_HOURS_AVAILABLE: t('reservation.noHoursAvailable'),
      NO_COURTS_AVAILABLE: t('reservation.noCourtsAvailable'),
      DINERS: t('reservation.diners'),
      NO_TABLES_AVAILABLE: t('reservation.noTablesAvailable'),
      CONFIRM_RESERVATION: t('reservation.confirmReservation'),
      OTHER_SELECT: t('reservation.otherSelect'),
    },
    CALENDARCOMPONENT: {
        DATE: t('reservation.calendarComponent.date'),
        MONDAY: t('reservation.calendarComponent.monday'),
        TUESDAY: t('reservation.calendarComponent.tuesday'),
        WEDNESDAY: t('reservation.calendarComponent.wednesday'),
        THURSDAY: t('reservation.calendarComponent.thursday'),
        FRIDAY: t('reservation.calendarComponent.friday'),
        SATURDAY: t('reservation.calendarComponent.saturday'),
        SUNDAY: t('reservation.calendarComponent.sunday'),
    },
    CONFIRMATIONMODAL: {
        TITLE: t('reservation.confirmationModal.title'),
        MESSAGE: t('reservation.confirmationModal.message')
    },
    COURT: {
        TITLE: t('reservation.court.title'),
        UNAVAILABLEMESSAGE: t('reservation.court.unavailableMessage')
    },
    SUMMARYCARD: {
        TITLE: t('reservation.summaryCard.title'),
        SERVICE: t('reservation.summaryCard.service'),
        DATE: t('reservation.summaryCard.date'),
        TIME: t('reservation.summaryCard.time'),
        COURT: t('reservation.summaryCard.court'),
        TABLE: t('reservation.summaryCard.table'),
        PEOPLE: t('reservation.summaryCard.people'),
    },
    TABLESELECTOR: {
        PERS: t('reservation.tableSelector.people'),
    },
    TIMESLOTS: {
        TITLE: t('reservation.timeSlots.title'),
    }
  };

  return { messages };
};

export default useMessages;
