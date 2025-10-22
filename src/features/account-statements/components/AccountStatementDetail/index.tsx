import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Card from '../../../../shared/components/Card';
import { COLORS } from '../../../../shared/theme/colors';
import { AccountStatementDetailProps } from '../../interfaces';
import styles from './Style';

const AccountStatementDetail: React.FC<AccountStatementDetailProps> = ({
  statement,
  onClose,
  onDownload
}) => {
  if (!statement) {
    return null;
  }

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '-';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    // Parse the date string properly to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateLong = (dateString: string) => {
    // Parse the date string properly to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
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

  // Concatenate city and postal code
  const fullCity = `${statement.userInfo.city} C.P. ${statement.userInfo.postalCode}`;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.period}>{statement.period}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={COLORS.gray600} />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{statement.description}</Text>

        <ScrollView style={styles.content}>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fecha Límite de Pago:</Text>
              <Text style={styles.infoValue}>{formatDateLong(statement.dueDate)}</Text>
            </View>
          </View>

          <View style={styles.personalInfoContainer}>
            <Text style={styles.personalInfoTitle}>Información Personal</Text>
            <View style={styles.personalInfoRow}>
              <Text style={styles.infoLabel}>Número de Socio:</Text>
              <Text style={styles.infoValue}>{statement.userInfo.id}</Text>
            </View>
            <View style={styles.personalInfoRow}>
              <Text style={styles.infoLabel}>Nombre:</Text>
              <Text style={styles.infoValue}>{statement.userInfo.name}</Text>
            </View>
            <View style={styles.personalInfoRow}>
              <Text style={styles.infoLabel}>Dirección:</Text>
              <Text style={styles.infoValue}>{statement.userInfo.address}</Text>
            </View>
            <View style={styles.personalInfoRow}>
              <Text style={styles.infoLabel}>Ciudad:</Text>
              <Text style={styles.infoValue}>{fullCity}</Text>
            </View>
          </View>

          <Text style={styles.detailsTitle}>Detalles del Estado de Cuenta</Text>
          
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.conceptColumn]}>Concepto</Text>
            <Text style={[styles.tableHeaderText, styles.chargesColumn]}>Cargos</Text>
            <Text style={[styles.tableHeaderText, styles.creditsColumn]}>Abonos</Text>
          </View>
          
          <View style={styles.tableBody}>
            {statement.details.map((detail, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableText, styles.conceptColumn]}>{detail.concept}</Text>
                <Text style={[styles.tableText, styles.chargesColumn, styles.rightAlign]}>
                  {detail.charges !== null ? formatCurrency(detail.charges) : '-'}
                </Text>
                <Text style={[styles.tableText, styles.creditsColumn, styles.rightAlign]}>
                  {detail.credits !== null ? formatCurrency(detail.credits) : '-'}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.summaryTitle}>Resumen</Text>
          
          <View style={styles.summaryContainer}>
            {statement.summary.map((item, index) => (
              <View key={index} style={styles.summaryRow}>
                <Text style={styles.summaryConcept}>{item.concept}</Text>
                <Text style={styles.summaryAmount}>
                  {formatCurrency(item.amount)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total a pagar</Text>
            <Text style={styles.totalAmount}>{formatCurrency(statement.totalAmount)}</Text>
          </View>

          <TouchableOpacity 
            style={styles.downloadButton} 
            onPress={() => onDownload(statement)}
          >
            <Ionicons name="download-outline" size={20} color={COLORS.white} />
            <Text style={styles.downloadButtonText}>Descargar PDF</Text>
          </TouchableOpacity>
        </ScrollView>
      </Card>
    </View>
  );
};

export default AccountStatementDetail;