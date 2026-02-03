import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Switch, Text, View, useColorScheme, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../../constants/theme';
import useMessages from '../hooks/useMessages';
import styles from './Style';
import {
  useNotificationPreferencesStore,
  reservationReminderOptions,
  eventReminderOptions,
} from '../store/useNotificationPreferencesStore';

const SettingsScreen = () => {
  const { messages } = useMessages();
  const { i18n } = useTranslation();
  const colorScheme = useColorScheme() || 'light';
  const [isDarkMode, setIsDarkMode] = React.useState(colorScheme === 'dark');
  const [showReminderPicker, setShowReminderPicker] = React.useState<'reservation' | 'event' | null>(null);
  
  const colors = Colors[isDarkMode ? 'dark' : 'light'];

  // Notification preferences from store
  const {
    enabled: notificationsEnabled,
    reservationReminder,
    eventReminder,
    reservationNotifications,
    eventNotifications,
    surveyNotifications,
    promotionNotifications,
    quietHoursEnabled,
    setEnabled: setNotificationsEnabled,
    setReservationReminder,
    setEventReminder,
    setReservationNotifications,
    setEventNotifications,
    setSurveyNotifications,
    setPromotionNotifications,
    setQuietHoursEnabled,
  } = useNotificationPreferencesStore();

  const toggleTheme = () => {
    setIsDarkMode(previousState => !previousState);
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const getReminderLabel = (minutes: number) => {
    const option = [...reservationReminderOptions, ...eventReminderOptions].find(o => o.value === minutes);
    return option?.label || `${minutes} min`;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Appearance Section */}
      <View style={[styles.section, { backgroundColor: colors.background, shadowColor: colors.text }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{messages.CONTAINER.APPEARANCE}</Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: colors.text }]}>{messages.CONTAINER.DARK_MODE}</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.tint }}
            thumbColor={isDarkMode ? colors.tint : colors.background}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>

      {/* Notifications Section */}
      <View style={[styles.section, { backgroundColor: colors.background, shadowColor: colors.text }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{messages.CONTAINER.NOTIFICATIONS}</Text>
        
        {/* Master toggle */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: colors.text }]}>{messages.CONTAINER.ENABLE_NOTIFICATIONS}</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.tint }}
            thumbColor={notificationsEnabled ? colors.tint : colors.background}
            onValueChange={setNotificationsEnabled}
            value={notificationsEnabled}
          />
        </View>

        {notificationsEnabled && (
          <>
            {/* Notification Types */}
            <Text style={[styles.subsectionTitle, { color: colors.text, marginTop: 16 }]}>
              Tipos de notificaciones
            </Text>

            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Ionicons name="calendar-outline" size={20} color={colors.tint} style={{ marginRight: 8 }} />
                <Text style={[styles.settingText, { color: colors.text }]}>Reservaciones</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: colors.tint }}
                thumbColor={reservationNotifications ? colors.tint : colors.background}
                onValueChange={setReservationNotifications}
                value={reservationNotifications}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Ionicons name="megaphone-outline" size={20} color={colors.tint} style={{ marginRight: 8 }} />
                <Text style={[styles.settingText, { color: colors.text }]}>Eventos</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: colors.tint }}
                thumbColor={eventNotifications ? colors.tint : colors.background}
                onValueChange={setEventNotifications}
                value={eventNotifications}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Ionicons name="clipboard-outline" size={20} color={colors.tint} style={{ marginRight: 8 }} />
                <Text style={[styles.settingText, { color: colors.text }]}>Encuestas</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: colors.tint }}
                thumbColor={surveyNotifications ? colors.tint : colors.background}
                onValueChange={setSurveyNotifications}
                value={surveyNotifications}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Ionicons name="pricetag-outline" size={20} color={colors.tint} style={{ marginRight: 8 }} />
                <Text style={[styles.settingText, { color: colors.text }]}>Promociones</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: colors.tint }}
                thumbColor={promotionNotifications ? colors.tint : colors.background}
                onValueChange={setPromotionNotifications}
                value={promotionNotifications}
              />
            </View>

            {/* Reminder Timing */}
            <Text style={[styles.subsectionTitle, { color: colors.text, marginTop: 16 }]}>
              Recordatorios
            </Text>

            {reservationNotifications && (
              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => setShowReminderPicker(showReminderPicker === 'reservation' ? null : 'reservation')}
              >
                <Text style={[styles.settingText, { color: colors.text }]}>Recordatorio de reservación</Text>
                <View style={styles.pickerButton}>
                  <Text style={{ color: colors.tint }}>{getReminderLabel(reservationReminder)}</Text>
                  <Ionicons name="chevron-down" size={16} color={colors.tint} />
                </View>
              </TouchableOpacity>
            )}

            {showReminderPicker === 'reservation' && (
              <View style={styles.pickerOptions}>
                {reservationReminderOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.pickerOption,
                      reservationReminder === option.value && { backgroundColor: colors.tint + '20' }
                    ]}
                    onPress={() => {
                      setReservationReminder(option.value);
                      setShowReminderPicker(null);
                    }}
                  >
                    <Text style={[
                      styles.pickerOptionText,
                      { color: reservationReminder === option.value ? colors.tint : colors.text }
                    ]}>
                      {option.label}
                    </Text>
                    {reservationReminder === option.value && (
                      <Ionicons name="checkmark" size={18} color={colors.tint} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {eventNotifications && (
              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => setShowReminderPicker(showReminderPicker === 'event' ? null : 'event')}
              >
                <Text style={[styles.settingText, { color: colors.text }]}>Recordatorio de evento</Text>
                <View style={styles.pickerButton}>
                  <Text style={{ color: colors.tint }}>{getReminderLabel(eventReminder)}</Text>
                  <Ionicons name="chevron-down" size={16} color={colors.tint} />
                </View>
              </TouchableOpacity>
            )}

            {showReminderPicker === 'event' && (
              <View style={styles.pickerOptions}>
                {eventReminderOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.pickerOption,
                      eventReminder === option.value && { backgroundColor: colors.tint + '20' }
                    ]}
                    onPress={() => {
                      setEventReminder(option.value);
                      setShowReminderPicker(null);
                    }}
                  >
                    <Text style={[
                      styles.pickerOptionText,
                      { color: eventReminder === option.value ? colors.tint : colors.text }
                    ]}>
                      {option.label}
                    </Text>
                    {eventReminder === option.value && (
                      <Ionicons name="checkmark" size={18} color={colors.tint} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Quiet Hours */}
            <Text style={[styles.subsectionTitle, { color: colors.text, marginTop: 16 }]}>
              Horario silencioso
            </Text>

            <View style={styles.settingItem}>
              <View style={styles.settingLabelContainer}>
                <Ionicons name="moon-outline" size={20} color={colors.tint} style={{ marginRight: 8 }} />
                <Text style={[styles.settingText, { color: colors.text }]}>No molestar (22:00 - 08:00)</Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: colors.tint }}
                thumbColor={quietHoursEnabled ? colors.tint : colors.background}
                onValueChange={setQuietHoursEnabled}
                value={quietHoursEnabled}
              />
            </View>
          </>
        )}
      </View>

      {/* Language Section */}
      <View style={[styles.section, { backgroundColor: colors.background, shadowColor: colors.text }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{messages.CONTAINER.LANGUAGE}</Text>
        <View style={styles.languageItem}>
          <Text 
            style={[
              styles.languageText, 
              { color: colors.text },
              i18n.language === 'es' && [styles.selectedLanguage, { color: colors.tint }]
            ]}
            onPress={() => changeLanguage('es')}
          >
            {messages.CONTAINER.SPANISH}
          </Text>
          <Text 
            style={[
              styles.languageText, 
              { color: colors.text },
              i18n.language === 'en' && [styles.selectedLanguage, { color: colors.tint }]
            ]}
            onPress={() => changeLanguage('en')}
          >
            {messages.CONTAINER.ENGLISH}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
