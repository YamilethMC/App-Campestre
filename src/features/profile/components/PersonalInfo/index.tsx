import React from 'react';
import { Text, View } from 'react-native';
import Input from '../../../../shared/components/Input/Input';
import useMessages from '../../hooks/useMessages';
import { userProfile } from '../../interfaces/interfaces';
import { styles } from './Style';

const PersonalInfo: React.FC<userProfile> = ({
  name,
  lastName,
  email,
  phone,
  address,
  street,
  externalNumber,
  internalNumber,
  colony,
  zipCode,
  city,
  state,
  country,
  memberSince,
  isEditing = false,
  onNameChange = () => {},
  onlastNameChange = () => {},
  onEmailChange = () => {},
  onPhoneChange = () => {},
  onAddressChange = () => {},
  onStreetChange = () => {},
  onexternalNumberChange = () => {},
  oninternalNumberChange = () => {},
  oncolonyChange = () => {},
  onzipCodeChange = () => {},
  oncityChange = () => {},
  onstateChange = () => {},
  oncountryChange = () => {},
  style,
}) => {
  const { messages } = useMessages();
  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return messages.CONTAINER.NO_SPECIFIED;

    try {
      // Si la fecha es una cadena ISO, creamos la fecha manteniendo la zona horaria original
      let d: Date;
      if (typeof date === 'string') {
        // Para fechas en formato ISO con Z (UTC), mantenemos la fecha tal cual
        if (date.endsWith('Z')) {
          d = new Date(date);
        } else {
          // Para otros formatos, creamos la fecha directamente pero usamos métodos UTC
          d = new Date(date);
        }
      } else {
        d = date;
      }

      // Check if the date is valid
      if (isNaN(d.getTime())) return messages.CONTAINER.NO_SPECIFIED;

      // Extraer componentes de la fecha UTC para evitar problemas de zona horaria
      const day = d.getUTCDate();
      const month = d.getUTCMonth(); // 0-indexed (0 = Enero)
      const year = d.getUTCFullYear();

      // Array con los nombres de los meses en español
      const months = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ];

      return `${day} de ${months[month]} de ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return messages.CONTAINER.NO_SPECIFIED;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>{messages.PERSONAL.NAME}</Text>
          {isEditing ? (
            <>
              <Input
                value={name}
                onChangeText={onNameChange}
                placeholder={messages.PERSONAL.NAME}
                style={styles.input}
              />
              <Input
                value={lastName}
                onChangeText={onlastNameChange}
                placeholder={messages.PERSONAL.LAST_NAME}
                style={styles.input}
              />
            </>
          ) : (
            <Text style={styles.value}>
              {`${name} ${lastName}` || messages.CONTAINER.NO_SPECIFIED}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>{messages.PERSONAL.EMAIL}</Text>
          {isEditing ? (
            <Input
              value={email}
              onChangeText={onEmailChange}
              placeholder={messages.CONTAINER.EXAMPLE_EMAIL}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>{email || messages.CONTAINER.NO_SPECIFIED}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>{messages.PERSONAL.PHONE}</Text>
          {isEditing ? (
            <Input
              value={phone}
              onChangeText={onPhoneChange}
              placeholder="(999) 123-4567"
              keyboardType="phone-pad"
              style={styles.input}
            />
          ) : (
            <Text style={styles.value}>{phone || messages.CONTAINER.NO_SPECIFIED}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>{messages.PERSONAL.ADDRESS}</Text>
          {isEditing ? (
            <>
              <Input
                value={street}
                onChangeText={onStreetChange}
                placeholder={messages.CONTAINER.EXAMPLE_STREET}
                style={styles.input}
              />

              <Input
                value={externalNumber}
                onChangeText={onexternalNumberChange}
                placeholder={messages.CONTAINER.EXAMPLE_EXTERNAL_NUMBER}
                style={styles.input}
              />

              <Input
                value={internalNumber}
                onChangeText={oninternalNumberChange}
                placeholder={messages.CONTAINER.EXAMPLE_INTERNAL_NUMBER}
                style={styles.input}
              />

              <Input
                value={colony}
                onChangeText={oncolonyChange}
                placeholder={messages.CONTAINER.EXAMPLE_COLONY}
                style={styles.input}
              />

              <Input
                value={zipCode}
                onChangeText={onzipCodeChange}
                placeholder={messages.CONTAINER.EXAMPLE_ZIP_CODE}
                style={styles.input}
              />

              <Input
                value={city}
                onChangeText={oncityChange}
                placeholder={messages.CONTAINER.EXAMPLE_CITY}
                style={styles.input}
              />

              <Input
                value={state}
                onChangeText={onstateChange}
                placeholder={messages.CONTAINER.EXAMPLE_STATE}
                style={styles.input}
              />

              <Input
                value={country}
                onChangeText={oncountryChange}
                placeholder={messages.CONTAINER.EXAMPLE_COUNTRY}
                style={styles.input}
              />
            </>
          ) : (
            <Text style={styles.value}>{address || messages.CONTAINER.NO_SPECIFIED}</Text>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>{messages.PERSONAL.MEMBER_SINCE}</Text>
          <Text style={styles.value}>{formatDate(memberSince)}</Text>
        </View>
      </View>
    </View>
  );
};

export default PersonalInfo;
