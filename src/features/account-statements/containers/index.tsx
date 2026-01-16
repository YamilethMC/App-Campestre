import React from 'react';
import { Modal, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import AccountStatementCard from '../components/AccountStatementCard';
import AccountStatementDetail from '../components/AccountStatementDetail';
import AccountStatementHeader from '../components/AccountStatementHeader';
import { useAccountStatements } from '../hooks';
import useMessages from '../hooks/useMessages';

const AccountStatementsContainer = () => {
  const { messages } = useMessages();

  const {
    filteredStatements,
    loading,
    error,
    fetchStatements,
    statements,
    handleCardPress,
    // handleDownload,
    showDetail,
    setShowDetail,
    setSelectedStatement,
    selectedStatement,
    handleDownload
  } = useAccountStatements();

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const hasStatements = statements.length > 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.gray50 }}>
      <ScrollView>
        {/* Header */}
        <AccountStatementHeader />
        {hasStatements && statements.map((statement) => (
          <AccountStatementCard
            key={statement.id}
            statement={statement}
            onPress={handleCardPress}
            onDownload={handleDownload}
          />
        ))}
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDetail}
        onRequestClose={handleCloseDetail}
      >
        <AccountStatementDetail
          statement={selectedStatement}
          onClose={handleCloseDetail}
          onDownload={handleDownload}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default AccountStatementsContainer;