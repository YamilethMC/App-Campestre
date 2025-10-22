import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Card from '../../../../shared/components/Card';
import { COLORS } from '../../../../shared/theme/colors';
import { AccountStatementCardProps } from '../../interfaces';
import styles from './Style';

const AccountStatementCard: React.FC<AccountStatementCardProps> = ({
  statement,
  onPress,
  onDownload
}) => {
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
        return 'Pagado';
      case 'pending':
        return 'Pendiente';
      case 'overdue':
        return 'Vencido';
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
            <Text style={styles.concept}>{statement.concept}</Text>
          </View>
          
          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(statement.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(statement.status) }]}>
                {getStatusText(statement.status)}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.details}>
          <Text style={styles.totalLabel}>Total a pagar</Text>
          <Text style={styles.totalAmount}>{formatCurrency(statement.totalAmount)}</Text>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.viewButton} onPress={() => onPress(statement)}>
            <Text style={styles.viewButtonText}>Ver Detalles</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.downloadButton} 
            onPress={() => onDownload(statement)}
          >
            <Ionicons name="download-outline" size={16} color={COLORS.white} />
            <Text style={styles.downloadButtonText}>Descargar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

export default AccountStatementCard;