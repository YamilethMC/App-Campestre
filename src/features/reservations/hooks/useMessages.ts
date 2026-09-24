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
      TITLE: t('reservation.title') || 'Reservaciones',
      MY_RESERVATIONS: t('reservations.myReservations') || 'Mis Reservas',
      COURTS_LABEL: t('reservation.courtsLabel'),
      CLASSES_LABEL: t('reservation.classesLabel'),
      GROUP_COURTS: t('reservation.groupCourts'),
      GROUP_CLASSES: t('reservation.groupClasses'),
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
    CLASSES: {
        TITLE: t('reservation.classes.title'),
        SUBTITLE: t('reservation.classes.subtitle'),
        SELECT_DATE: t('reservation.classes.selectDate'),
        DATE_PLACEHOLDER: t('reservation.classes.datePlaceholder'),
        SELECT_DISCIPLINE: t('reservation.classes.selectDiscipline'),
        PROFESSIONALS_OF: t('reservation.classes.professionalsOf'),
        VIEW_SCHEDULES: t('reservation.classes.viewSchedules'),
        NO_DISCIPLINES: t('reservation.classes.noDisciplines'),
        NO_PROFESSIONALS: t('reservation.classes.noProfessionals'),
        NUMBER_OF_PEOPLE: t('reservation.classes.numberOfPeople'),
        PRICES_PER_CLASS: t('reservation.classes.pricesPerClass'),
        PERSON: t('reservation.classes.person'),
        PEOPLE: t('reservation.classes.people'),
        AVAILABILITY_CAPTION: t('reservation.classes.availabilityCaption'),
        AVAILABILITY_VALUE: t('reservation.classes.availabilityValue'),
        TAKEN: t('reservation.classes.taken'),
        NO_SLOTS: t('reservation.classes.noSlots'),
        SELECT_DATE_FIRST: t('reservation.classes.selectDateFirst'),
        CONTINUE: t('reservation.classes.continue'),
        SUMMARY_DISCIPLINE: t('reservation.classes.summaryDiscipline'),
        SUMMARY_PROFESSIONAL: t('reservation.classes.summaryProfessional'),
        SUMMARY_DATE: t('reservation.classes.summaryDate'),
        SUMMARY_TIME: t('reservation.classes.summaryTime'),
        SUMMARY_PEOPLE: t('reservation.classes.summaryPeople'),
        SUMMARY_PRICE: t('reservation.classes.summaryPrice'),
        CONFIRM_TITLE: t('reservation.classes.confirmTitle'),
        CONFIRM_RESERVATION: t('reservation.classes.confirmReservation'),
        MY_CLASSES: t('reservation.classes.myClasses'),
        ACTIVE: t('reservation.classes.active'),
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
