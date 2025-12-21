import React from 'react';
import { Modal, SafeAreaView, ScrollView } from 'react-native';
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
    handleDownload,
  } = useAccountStatements();

  // const {
  //   statements,
  //   getFilteredStatements,
  //   setFilter,
  //   setLoading,
  //   setError,
  //   setStatements,
  // } = useAccountStatementStore();

  // if (error) {
  //   Alert.alert('Error', error);
  // }

  // const handleCardPress = (statement: any) => {
  //   // setSelectedStatement(statement);
  //   // setShowDetail(true);
  //   console.log('statement', statement);
  // };

  const handleCloseDetail = () => {
    setShowDetail(false);
    // setSelectedStatement(null);
  };

  const hasStatements = statements.length > 0;
  // const hasNoFilteredStatements = statements.length > 0 && filteredStatements.length === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <ScrollView>
        {/* Header */}
        <AccountStatementHeader />

        {/* List of Account Statements */}
        {/* {!loading && !hasStatements && (
          <EmptyState
            message={statements.length > 0 ? messages.CONTAINER.NO_STATEMENTS1 : messages.CONTAINER.NO_STATEMENTS2}
          />
        )} */}

        {/* {hasNoFilteredStatements && (
          <EmptyState message= {messages.CONTAINER.NO_STATEMENTS_FILTERS} />
        )} */}

        {hasStatements &&
          statements.map(statement => (
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
