import { useTranslation } from 'react-i18next';

const useMessages = () => {
  const { t } = useTranslation();
  const messages = {
    CONTAINER: {
      PLACEHOLDER: t('events.placeholderSearch'),
      UPCOMINGEVENTS: t('events.upcomingEvents'),
      TITLESINGULAR: t('events.titleSingular'),
      NOEVENTS: t('events.noEvents'),
      NOEVENTSREGISTERED: t('events.noEventsRegistered'),
    },
    EVENTCARD: {
      REGISTERED: t('events.eventCard.registered'),
      BUSY: t('events.eventCard.busy'),
      SUCCESSREGISTERED: t('events.eventCard.successRegistered'),
      CANCELREGISTRATION: t('events.eventCard.cancelRegistration'),
      ACTIVATEREMINDER: t('events.eventCard.activateReminder'),
      REGISTER: t('events.eventCard.register'),
    },
  };

  return { messages };
};

export default useMessages;
