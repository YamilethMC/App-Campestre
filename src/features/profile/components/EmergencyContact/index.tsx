import Input from '@/src/shared/components/Input/Input';
import React from 'react';
import { Text, View } from 'react-native';
import Select from '../../../../shared/components//Select/Select';
import useMessages from '../../hooks/useMessages';
import { emergencyContact } from '../../interfaces/interfaces';
import { styles } from './Style';

const EmergencyContact: React.FC<emergencyContact> = ({
  name,
  relationship,
  phone,
  style,
  isEditingContactEmergency,
  onNameChange,
  onRelationshipChange,
  onPhoneChange,
  rightAction
}) => {
  const { messages } = useMessages();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.contactInfo}>
        <View style={[styles.detailRow, isEditingContactEmergency && styles.detailRowEditing]}>
          {isEditingContactEmergency ? (
            <View style={styles.editFieldContainer}>
              <Text style={[styles.detailLabel, isEditingContactEmergency && styles.detailLabelEditing]}>{messages.EMERGENCY.NAME}:</Text>
              <Input
                value={name}
                onChangeText={onNameChange}
                placeholder={messages.EMERGENCY.NAME}
                style={styles.input} 
              />
            </View>
          ) : (
            <Text style={[styles.contactName, isEditingContactEmergency && styles.detailValueEditing]}>{name || messages.CONTAINER.NO_SPECIFIED}</Text>
          )}
        </View>
        
        <View style={[styles.detailRow, isEditingContactEmergency && styles.detailRowEditing]}>
          {isEditingContactEmergency ? (
            <View style={styles.editFieldContainer}>
              <Text style={[styles.detailLabel, isEditingContactEmergency && styles.detailLabelEditing]}>{messages.EMERGENCY.RELATIONSHIP}:</Text>
              <Select
                placeholder={messages.EMERGENCY.RELATIONSHIP}
                options={[
                  { label: 'Padre', value: 'padre' },
                  { label: 'Madre', value: 'madre' },
                  { label: 'Hijo/Hija', value: 'hijo' },
                  { label: 'Hermano/Hermana', value: 'hermano' },
                  { label: 'Esposo/Esposa', value: 'esposo' },
                  { label: 'Tío/Tía', value: 'tio' },
                  { label: 'Primo/Prima', value: 'primo' },
                  { label: 'Otro', value: 'otro' },
                  // Agregar el valor actual si no está en las opciones estándar
                  ...(relationship && !['padre', 'madre', 'hijo', 'hermano', 'esposo', 'tio', 'primo', 'otro'].includes(relationship) 
                    ? [{ label: relationship, value: relationship }] 
                    : []),
                ]}
                selectedValue={relationship}
                onValueChange={(value) => onRelationshipChange(value as string)}
                style={styles.select}
                dropdownStyle={styles.selectContainer}
                itemTextStyle={styles.selectedText}
              />
            </View>
          ) : (
            <View style={styles.detailValue}>
              <Text style={styles.detailValueEditing}>{relationship || messages.CONTAINER.NO_SPECIFIED} • {phone || messages.CONTAINER.NO_SPECIFIED}</Text>
            </View>
          )}
        </View>
        
        <View style={[styles.detailRow, isEditingContactEmergency && styles.detailRowEditing]}>
          {isEditingContactEmergency ? (
            <View style={styles.editFieldContainer}>
              <Text style={[styles.detailLabel, isEditingContactEmergency && styles.detailLabelEditing]}>{messages.EMERGENCY.PHONE}:</Text>
              <Input
              value={phone}
              onChangeText={onPhoneChange}
              placeholder={messages.EMERGENCY.PHONE}
              style={styles.input}
            />
            </View>
          ) : (
            null
          )}
        </View>
      </View>
    </View>
  );
};

export default EmergencyContact;
