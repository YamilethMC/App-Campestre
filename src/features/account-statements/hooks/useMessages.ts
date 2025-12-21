import { useTranslation } from 'react-i18next';

const useMessages = () => {
  const { t } = useTranslation();
  const messages = {
    TITLE: t('accountStatements.title'),
    DESCRIPTION: t('accountStatements.description'),
    EMPTY_STATE: t('accountStatements.emptyState'),
    CONTAINER: {
      NO_STATEMENTS1: t('accountStatements.container.noStatements1'),
      NO_STATEMENTS2: t('accountStatements.container.noStatements2'),
      NO_STATEMENTS_FILTERS: t('accountStatements.container.noStatementsFilters'),
    },
    ACCOUNTSTATEMENTCARD: {
      STATUS: {
        PAID: t('accountStatements.accountStatementCard.status.paid'),
        PENDING: t('accountStatements.accountStatementCard.status.pending'),
        OVERDUE: t('accountStatements.accountStatementCard.status.overdue'),
      },
      TOTAL: t('accountStatements.accountStatementCard.total'),
      DOWNLOAD: t('accountStatements.accountStatementCard.download'),
      VIEWDETAILS: t('accountStatements.accountStatementCard.viewDetails'),
    },
    ACCOUNTSTATEMENTDETAIL: {
      DATE_PAY_LIMIT: t('accountStatements.accountStatementDetail.datePayLimit'),
      PERSONAL_INFORMATION: t('accountStatements.accountStatementDetail.personalInformation'),
      MEMBER_NUMBER: t('accountStatements.accountStatementDetail.memberNumber'),
      NAME: t('accountStatements.accountStatementDetail.name'),
      ADDRES: t('accountStatements.accountStatementDetail.address'),
      CITY: t('accountStatements.accountStatementDetail.city'),
      STATEMENT_DETAIL: t('accountStatements.accountStatementDetail.statementDetails'),
      CONCEPT: t('accountStatements.accountStatementDetail.concept'),
      CHARGES: t('accountStatements.accountStatementDetail.charges'),
      CREDITS: t('accountStatements.accountStatementDetail.credits'),
      SUMMARY: t('accountStatements.accountStatementDetail.summary'),
    },
  };

  return { messages };
};

export default useMessages;
