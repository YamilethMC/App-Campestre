import { COLORS } from '@/src/shared/theme/colors';
import React, { useState } from 'react';
import { View } from 'react-native';
import Modal from '../../../../shared/components/Modal/Modal';
import Select from '../../../../shared/components/Select/Select';
import { useProfileStore } from '../../../profile/store/useProfileStore';

interface VehicleModalProps {
  visible: boolean;
  onClose: () => void;
  onVehicleSelect: (vehicleId: string, vehicleName: string) => void;
}

const VehicleModal: React.FC<VehicleModalProps> = ({ visible, onClose, onVehicleSelect }) => {
  const { profile } = useProfileStore();
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');

  const vehicles = profile?.vehicles?.filter(v => v.isActive) || [];

  const vehicleOptions = vehicles.map(vehicle => ({
    label: `${vehicle.model} - ${vehicle.plate}`,
    value: vehicle.id.toString(),
  }));

  const handleVehicleChange = (value: string | number) => {
    setSelectedVehicle(value.toString());
  };

  const handleClose = () => {
    setSelectedVehicle(''); // Limpiar la selección al cerrar
    onClose();
  };

  const handleConfirm = () => {
    if (!selectedVehicle) {
      return;
    }

    // Find the selected vehicle to get its name
    const selectedVehicleData = vehicles.find(v => v.id.toString() === selectedVehicle);
    if (selectedVehicleData) {
      onVehicleSelect(selectedVehicle, selectedVehicleData.model);
    }
    setSelectedVehicle(''); // También limpiar después de confirmar
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Seleccionar vehículo"
      onCancel={handleClose}
      onConfirm={handleConfirm}
      confirmText="Solicitar"
      cancelText="Cancelar"
      disableConfirmButton={!selectedVehicle} // Disable confirm button when no vehicle is selected
      buttonsContainerStyle={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
      confirmButtonStyle={{
        flex: 1,
        paddingVertical: 15, // Mayor altura
        backgroundColor: COLORS.primary, // Usar color primario de la app
        borderRadius: 8,
        marginRight: 5,
        alignItems: 'center',
      }}
      confirmButtonTextStyle={{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
      }}
      cancelButtonStyle={{
        flex: 1,
        paddingVertical: 15, // Mayor altura
        backgroundColor: COLORS.gray200, // Usar color gris de la app
        borderRadius: 8,
        marginLeft: 5,
        alignItems: 'center',
      }}
      cancelButtonTextStyle={{
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary, // Texto en color primario
      }}
    >
      <View style={{ padding: 10 }}>
        <Select
          placeholder="Elige tu vehículo"
          options={vehicleOptions}
          selectedValue={selectedVehicle}
          onValueChange={handleVehicleChange}
        />
      </View>
    </Modal>
  );
};

export default VehicleModal;
