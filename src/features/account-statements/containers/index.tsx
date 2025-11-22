import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView } from 'react-native';
import AccountStatementCard from '../components/AccountStatementCard';
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
    setSelectedStatement,
    selectedStatement,
    statements,
  } = useAccountStatements();
  
  // const {
  //   statements,
  //   getFilteredStatements,
  //   setFilter,
  //   setLoading,
  //   setError,
  //   setStatements,
  // } = useAccountStatementStore();
  
  const [showDetail, setShowDetail] = useState(false);

  // if (error) {
  //   Alert.alert('Error', error);
  // }

  const handleCardPress = (statement: any) => {
    // setSelectedStatement(statement);
    setShowDetail(true);
  };

  const handleDownload = async (statement: any) => {
    try {
      // Perform the download - this will copy the PDF to device storage
      // const downloadUri = await downloadStatement(statement.id);
      const downloadUri = 'https://www.wipple.com.mx';
      
      if (downloadUri) {
        // Check if sharing is available and share the file
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(downloadUri);
        } else {
          console.log(`File saved to: ${downloadUri}`);
          Alert.alert('Éxito', `El archivo ${statement.fileName} se ha descargado.`);
        }
      }
    } catch (err: any) {
      console.error('Download error:', err);
      Alert.alert('Error', `Ocurrió un error al descargar el archivo: ${err.message || 'Error desconocido'}`);
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    // setSelectedStatement(null);
  };

  const hasStatements = statements.length > 0;
  console.log('statements', statements);
  console.log('hasStatements', hasStatements);
  console.log('statements.length', statements.length);
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
        
        {hasStatements && statements.map((statement) => (
          console.log('statement en el ciclo', statement),
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
        {/* <AccountStatementDetail
          statement={selectedStatement}
          onClose={handleCloseDetail}
          onDownload={handleDownload}
        /> */}
      </Modal>
    </SafeAreaView>
  );
};

export default AccountStatementsContainer;