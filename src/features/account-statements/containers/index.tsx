import React, { useState } from 'react';
import { Alert, Modal, SafeAreaView, ScrollView, View } from 'react-native';
import * as Sharing from 'expo-sharing';
import { useAccountStatements } from '../hooks';
import { useAccountStatementStore } from '../store';
import AccountStatementHeader from '../components/AccountStatementHeader';
import AccountStatementCard from '../components/AccountStatementCard';
import EmptyState from '../components/EmptyState';
import AccountStatementDetail from '../components/AccountStatementDetail';
import { AccountStatement } from '../interfaces';

const AccountStatementsContainer = () => {
  const { 
    filteredStatements,
    loading,
    error,
  } = useAccountStatements();
  
  const {
    statements,
    setSelectedStatement,
    selectedStatement,
    downloadStatement
  } = useAccountStatementStore();
  
  const [showDetail, setShowDetail] = useState(false);

  if (error) {
    Alert.alert('Error', error);
  }

  const handleCardPress = (statement: AccountStatement) => {
    setSelectedStatement(statement);
    setShowDetail(true);
  };

  const handleDownload = async (statement: AccountStatement) => {
    try {
      // Perform the download - this will copy the PDF to device storage
      const downloadUri = await downloadStatement(statement.id);
      
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
    setSelectedStatement(null);
  };

  const hasStatements = filteredStatements.length > 0;
  const hasNoFilteredStatements = statements.length > 0 && filteredStatements.length === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <ScrollView>
        {/* Header */}
        <AccountStatementHeader />
        
        {/* List of Account Statements */}
        {!loading && !hasStatements && (
          <EmptyState 
            message={statements.length > 0 ? "No hay estados de cuenta registrados todav\u00EDa" : "No hay estados de cuenta registrados"} 
          />
        )}
        
        {hasNoFilteredStatements && (
          <EmptyState message="No hay estados de cuenta con los filtros aplicados" />
        )}
        
        {hasStatements && filteredStatements.map((statement) => (
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