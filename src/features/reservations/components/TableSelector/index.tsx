import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import { TableSelectorProps } from '../../interfaces/reservationInterface';
import styles from './Style';

export const TableSelector: React.FC<TableSelectorProps> = ({
  selectedTable,
  onTableChange,
  tables,
  unavailableMessage = 'No hay mesas disponibles',
}) => {
  const { messages } = useMessages();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="restaurant-outline" size={24} color={COLORS.primary} />
        <Text style={styles.label}>{messages.SUMMARYCARD.TABLE + 's'}</Text>
      </View>

      {tables.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tablesContainer}>
            {tables.map(table => (
              <TouchableOpacity
                key={table.id}
                style={[
                  styles.table,
                  table.available ? styles.availableTable : styles.unavailableTable,
                  selectedTable === table.id && styles.selectedTable,
                ]}
                onPress={() => table.available && onTableChange(table.id)}
                disabled={!table.available}
              >
                <Text
                  style={[
                    styles.tableText,
                    selectedTable === table.id && styles.selectedTableText,
                    !table.available && styles.unavailableText,
                  ]}
                >
                  {table.name}
                </Text>
                <Text
                  style={[
                    styles.capacityText,
                    selectedTable === table.id && styles.selectedCapacityText,
                    !table.available && styles.unavailableText,
                  ]}
                >
                  {table.capacity} {messages.TABLESELECTOR.PERS}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noAvailabilityContainer}>
          <Text style={styles.noAvailabilityText}>{unavailableMessage}</Text>
        </View>
      )}
    </View>
  );
};
