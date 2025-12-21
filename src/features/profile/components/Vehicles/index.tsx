import React from 'react';
import { Alert, FlatList, ListRenderItem, Text, View } from 'react-native';
import { styles } from './Style';

//Interfaces
import { vehiclesProps, vehicle } from '../../interfaces/interfaces';
import useMessages from '../../hooks/useMessages';

const Vehicles: React.FC<vehiclesProps> = ({ vehicles, onAddVehicle, style }) => {
  const { messages } = useMessages();
  // Ensure vehicles is always an array
  const vehicleList = vehicles || [];
  const renderItem: ListRenderItem<vehicle> = ({ item }) => (
    <View style={styles.vehicleItem}>
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehiclePlate}>{item.plate}</Text>
        <Text style={styles.vehicleModel}>{item.model}</Text>
      </View>
      <View style={[styles.statusBadge, item.isActive ? styles.activeBadge : styles.inactiveBadge]}>
        <Text style={[styles.statusText, item.isActive ? styles.activeText : styles.inactiveText]}>
          {item.isActive ? messages.VEHICLES.ACTIVE : messages.VEHICLES.INACTIVE}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={vehicleList}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{messages.VEHICLES.NO_VEHICLES}</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      {onAddVehicle && (
        <View style={styles.addButtonContainer}>
          <Text
            style={styles.addButton}
            onPress={() => {
              Alert.alert(
                messages.VEHICLES.ADD_VEHICLE,
                'Esta función no está disponible en este momento.',
                [{ text: 'OK' }],
              );
              if (onAddVehicle) onAddVehicle();
            }}
            /*onPress={onAddVehicle}*/
          >
            + {messages.VEHICLES.ADD_VEHICLE}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Vehicles;
