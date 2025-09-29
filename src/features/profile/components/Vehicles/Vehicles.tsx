import React from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import { styles } from './Style';

//Interfaces
import { VehiclesProps, vehicle } from '../../interfaces/interfaces';

const Vehicles: React.FC<VehiclesProps> = ({
  vehicles,
  onAddVehicle,
  style,
}) => {
  // Ensure vehicles is always an array
  const vehicleList = vehicles || [];
  const renderItem: ListRenderItem<vehicle> = ({ item }) => (
    <View style={styles.vehicleItem}>
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehiclePlate}>{item.plate}</Text>
        <Text style={styles.vehicleModel}>{item.model}</Text>
      </View>
      <View style={[
        styles.statusBadge,
        item.isActive ? styles.activeBadge : styles.inactiveBadge
      ]}>
        <Text style={[
          styles.statusText,
          item.isActive ? styles.activeText : styles.inactiveText
        ]}>
          {item.isActive ? 'Activo' : 'Inactivo'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={vehicleList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay vehículos registrados</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      {onAddVehicle && (
        <View style={styles.addButtonContainer}>
          <Text style={styles.addButton} onPress={onAddVehicle}>
            + Agregar vehículo
          </Text>
        </View>
      )}
    </View>
  );
};

export default Vehicles;
