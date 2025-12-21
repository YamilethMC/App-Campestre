import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Card from '../../../../shared/components/Card';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import { AccountStatementDetailProps } from '../../interfaces';
import styles from './Style';

const AccountStatementDetail: React.FC<AccountStatementDetailProps> = ({
  statement,
  onClose,
  onDownload,
}) => {
  const { messages } = useMessages();

  if (!statement) {
    return null;
  }

  console.log('datos de el estado de cuenta', statement);

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
      year: 'numeric',
    });
  };

  const formatDateLong = (dateString: string) => {
    // Parse the date string properly to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed
    return date.toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
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
        return messages.ACCOUNTSTATEMENTCARD.STATUS.PAID;
      case 'pending':
        return messages.ACCOUNTSTATEMENTCARD.STATUS.PENDING;
      case 'overdue':
        return messages.ACCOUNTSTATEMENTCARD.STATUS.OVERDUE;
      default:
        return status;
    }
  };

  // Concatenate city and postal code
  const fullCity = statement?.userInfo
    ? `${statement.userInfo.city || 'Ciudad'}${statement.userInfo.postalCode ? ` C.P. ${statement.userInfo.postalCode}` : ''}`
    : 'Ciudad no disponible';

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.period}>{statement.period || 'Período no especificado'}</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={COLORS.gray600} />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>
          {statement.description || 'Descripción no especificada'}
        </Text>

        <ScrollView style={styles.content}>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {messages.ACCOUNTSTATEMENTDETAIL.DATE_PAY_LIMIT || 'Fecha límite de pago'}
              </Text>
              <Text style={styles.infoValue}>
                {statement.dueDate || 'Fecha límite de pago no especificada'}
              </Text>
            </View>
          </View>

          <View style={styles.personalInfoContainer}>
            <Text style={styles.personalInfoTitle}>
              {messages.ACCOUNTSTATEMENTDETAIL.PERSONAL_INFORMATION || 'Información Personal'}
            </Text>
            <View style={styles.personalInfoRow}>
              <Text style={styles.infoLabel}>
                {messages.ACCOUNTSTATEMENTDETAIL.MEMBER_NUMBER || 'Número de socio'}
              </Text>
              <Text style={styles.infoValue}>
                {statement.userInfo.memberCode || 'No disponible'}
              </Text>
            </View>
            <View style={styles.personalInfoRow}>
              <Text style={styles.infoLabel}>
                {messages.ACCOUNTSTATEMENTDETAIL.NAME || 'Nombre'}
              </Text>
              <Text style={styles.infoValue}>{statement.userInfo.name || 'No disponible'}</Text>
            </View>
            <View style={styles.personalInfoRow}>
              <Text style={styles.infoLabel}>
                {messages.ACCOUNTSTATEMENTDETAIL.ADDRES || 'Dirección'}
              </Text>
              <Text style={styles.infoValue}>{statement.userInfo.address || 'No disponible'}</Text>
            </View>
            <View style={styles.personalInfoRow}>
              <Text style={styles.infoLabel}>
                {messages.ACCOUNTSTATEMENTDETAIL.CITY || 'Ciudad'}
              </Text>
              <Text style={styles.infoValue}>{fullCity || 'No disponible'}</Text>
            </View>
          </View>

          <Text style={styles.detailsTitle}>
            {messages.ACCOUNTSTATEMENTDETAIL.STATEMENT_DETAIL || 'Detalle del estado de cuenta'}
          </Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.conceptColumn]}>
              {messages.ACCOUNTSTATEMENTDETAIL.CONCEPT || 'Concepto'}
            </Text>
            <Text style={[styles.tableHeaderText, styles.chargesColumn]}>
              {messages.ACCOUNTSTATEMENTDETAIL.CHARGES || 'Cargos'}
            </Text>
            <Text style={[styles.tableHeaderText, styles.creditsColumn]}>
              {messages.ACCOUNTSTATEMENTDETAIL.CREDITS || 'Creditos'}
            </Text>
          </View>

          <View style={styles.tableBody}>
            {statement.details.map((detail, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableText, styles.conceptColumn]}>
                  {detail.concept || 'Concepto'}
                </Text>
                <Text style={[styles.tableText, styles.chargesColumn, styles.rightAlign]}>
                  {detail.charges !== null ? formatCurrency(detail.charges) : '-'}
                </Text>
                <Text style={[styles.tableText, styles.creditsColumn, styles.rightAlign]}>
                  {detail.credits !== null ? formatCurrency(detail.credits) : '-'}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.summaryTitle}>
            {messages.ACCOUNTSTATEMENTDETAIL.SUMMARY || 'Resumen'}
          </Text>

          <View style={styles.summaryContainer}>
            {statement.summary.map((item, index) => (
              <View key={index} style={styles.summaryRow}>
                <Text style={styles.summaryConcept}>{item.concept || 'Concepto'}</Text>
                <Text style={styles.summaryAmount}>{formatCurrency(item.amount)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>{messages.ACCOUNTSTATEMENTCARD.TOTAL || 'Total'}</Text>
            <Text style={styles.totalAmount}>
              {formatCurrency(statement.totalAmount) || 'Total'}
            </Text>
          </View>

          <TouchableOpacity style={styles.downloadButton} onPress={() => onDownload(statement)}>
            <Ionicons name="download-outline" size={20} color={COLORS.white} />
            <Text style={styles.downloadButtonText}>
              {messages.ACCOUNTSTATEMENTCARD.DOWNLOAD} PDF
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Card>
    </View>
  );
};

export default AccountStatementDetail;
