import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { useQuickActionStates } from '../../hooks/useQuickActionStates';
import VehicleModal from '../VehicleModal';
import WaiterModal from '../WaiterModal';
import styles from './Style';

interface QuickActionsProps {
  onVehicleSelect: (vehicleId: string, vehicleName: string) => void;
  onWaiterCall: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onVehicleSelect, onWaiterCall }) => {
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);
  const [waiterModalVisible, setWaiterModalVisible] = useState(false);

  const { vehicleRequested, waiterCalled, requestVehicle, callWaiter } = useQuickActionStates();

  const handleVehicleSelection = (id: string, name: string) => {
    onVehicleSelect(id, name);
    requestVehicle();
    setVehicleModalVisible(false);
  };

  const handleWaiterCall = () => {
    onWaiterCall();
    callWaiter();
    setWaiterModalVisible(false);
  };

  // Reset states when modals are closed
  const closeVehicleModal = () => {
    setVehicleModalVisible(false);
  };

  const closeWaiterModal = () => {
    setWaiterModalVisible(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="notifications-outline" size={24} color={COLORS.primary} />
        <Text style={styles.cardTitle}>Acciones rápidas</Text>
      </View>

      <View style={styles.quickActionsContainer}>
        {vehicleRequested ? (
          <TouchableOpacity
            style={[styles.quickActionItem, styles.disabledActionItem]}
            disabled={true}
          >
            <View style={[styles.iconContainer, styles.carIconContainer]}>
              <Ionicons name="car-outline" size={20} color={COLORS.gray700} />
            </View>
            <Text style={[styles.quickActionText, styles.disabledActionText]}>Auto en 5 min</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.quickActionItem, styles.carActionItem]}
            onPress={() => setVehicleModalVisible(true)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, styles.carIconContainer]}>
              <Ionicons name="car-outline" size={20} color="#0369A1" />
            </View>
            <Text style={[styles.quickActionText, styles.carActionText]}>Pedir auto</Text>
          </TouchableOpacity>
        )}

        {waiterCalled ? (
          <TouchableOpacity
            style={[styles.quickActionItem, styles.disabledActionItem]}
            disabled={true}
          >
            <View style={[styles.iconContainer, styles.waiterIconContainer]}>
              <Ionicons name="cafe-outline" size={20} color={COLORS.gray700} />
            </View>
            <Text style={[styles.quickActionText, styles.disabledActionText]}>Mesero en 7 min</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.quickActionItem, styles.waiterActionItem]}
            onPress={() => setWaiterModalVisible(true)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, styles.waiterIconContainer]}>
              <Ionicons name="cafe-outline" size={20} color="#B45309" />
            </View>
            <Text style={[styles.quickActionText, styles.waiterActionText]}>Llamar mesero</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modales */}
      <VehicleModal
        visible={vehicleModalVisible}
        onClose={closeVehicleModal}
        onVehicleSelect={handleVehicleSelection}
      />

      <WaiterModal
        visible={waiterModalVisible}
        onClose={closeWaiterModal}
        onConfirm={handleWaiterCall}
      />
    </View>
  );
};

export default QuickActions;
