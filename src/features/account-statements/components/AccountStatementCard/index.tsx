import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Card from '../../../../shared/components/Card';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import styles from './Style';

const AccountStatementCard: React.FC<any> = ({ statement, onPress, onDownload }) => {
  const { messages } = useMessages();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return COLORS.success;
      case 'pending':
        return COLORS.warning;
      case 'overdue':
        return COLORS.error;
      default:
        return COLORS.gray500;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return messages.ACCOUNTSTATEMENTCARD.STATUS.PAID;
      case 'pending':
        return messages.ACCOUNTSTATEMENTCARD.STATUS.PENDING;
      case 'overdue':
        return messages.ACCOUNTSTATEMENTCARD.STATUS.OVERDUE;
      default:
        return status;
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.periodContainer}>
            <Text style={styles.period}>{statement.period}</Text>
            <Text style={styles.concept}>{'Estado de Cuenta ' + statement.period}</Text>
          </View>

          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    getStatusColor(statement.currentBalance > 0 ? 'overdue' : 'paid') + '20',
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(statement.currentBalance > 0 ? 'overdue' : 'paid') },
                ]}
              >
                {getStatusText(statement.currentBalance > 0 ? 'overdue' : 'paid')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.details}>
          <Text style={styles.totalLabel}>{messages.ACCOUNTSTATEMENTCARD.TOTAL}</Text>
          <Text style={styles.totalAmount}>{formatCurrency(statement.previousBalance)}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.viewButton} onPress={() => onPress(statement)}>
            <Text style={styles.viewButtonText}>{messages.ACCOUNTSTATEMENTCARD.VIEWDETAILS}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.downloadButton} onPress={() => onDownload(statement)}>
            <Ionicons name="download-outline" size={16} color={COLORS.white} />
            <Text style={styles.downloadButtonText}>{messages.ACCOUNTSTATEMENTCARD.DOWNLOAD}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

export default AccountStatementCard;
