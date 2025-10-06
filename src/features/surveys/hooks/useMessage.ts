import { useTranslation } from 'react-i18next';

const useMessages = () => {
  const { t } = useTranslation();
  const messages = {
    CONTAINER: {
      LOADING: t('surveys.loading'),
      QUESTION: t('surveys.question'),
      OF: t('surveys.of'),
      REQUIRED: t('surveys.required'),
        PREVIOUS: t('surveys.previous'),
        NEXT: t('surveys.next'),
        SUBMIT: t('surveys.submit'),
        THANK_YOU: t('surveys.thankYou'),
        TEXT_INFORMATION: t('surveys.textInformation'),
        BACK_TO_SURVEYS: t('surveys.backToSurveys'),
        ANSWER_SURVERY: t('surveys.answerSurvey'),
        MESSAGE: t('surveys.message'),
        CONFIRM: t('surveys.confirm'),
        CANCEL: t('surveys.cancel'),
        PLACEHOLDER: t('surveys.placeholder'),
        YES: t('surveys.yes'),
        NO: t('surveys.no'),
    },
    HEADERWITHSTATS: {
        TITLE: t('surveys.headerWithStats.title'),
        TEXT: t('surveys.headerWithStats.text'),
        ACTIVE: t('surveys.headerWithStats.active'),
        COMPLETED: t('surveys.headerWithStats.completed'),
        AVERAGE: t('surveys.headerWithStats.average'),
    },
    SURVEYCARD: {
        PEOPLE: t('surveys.surveyCard.people'),
        QUESTIONS: t('surveys.surveyCard.questions'),
        START: t('surveys.surveyCard.start')
    }
  };

  return { messages };
};

export default useMessages;
