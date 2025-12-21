import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Switch, Text, View, useColorScheme } from 'react-native';
import { Colors } from '../../../../constants/theme';
import useMessages from '../hooks/useMessages';
import styles from './Style';

const SettingsScreen = () => {
  const { messages } = useMessages();
  const { i18n } = useTranslation();
  const colorScheme = useColorScheme() || 'light';
  const [isDarkMode, setIsDarkMode] = React.useState(colorScheme === 'dark');
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const colors = Colors[isDarkMode ? 'dark' : 'light'];

  const toggleTheme = () => {
    setIsDarkMode(previousState => !previousState);
    // TODO: Implement theme toggle logic
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(previousState => !previousState);
    // TODO: Implement notifications toggle logic
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[styles.section, { backgroundColor: colors.background, shadowColor: colors.text }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {messages.CONTAINER.APPEARANCE}
        </Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: colors.text }]}>
            {messages.CONTAINER.DARK_MODE}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.tint }}
            thumbColor={isDarkMode ? colors.tint : colors.background}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>

      <View
        style={[styles.section, { backgroundColor: colors.background, shadowColor: colors.text }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {messages.CONTAINER.NOTIFICATIONS}
        </Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: colors.text }]}>
            {messages.CONTAINER.ENABLE_NOTIFICATIONS}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.tint }}
            thumbColor={isDarkMode ? colors.tint : colors.background}
            onValueChange={toggleNotifications}
            value={notificationsEnabled}
          />
        </View>
      </View>

      <View
        style={[styles.section, { backgroundColor: colors.background, shadowColor: colors.text }]}
      >
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {messages.CONTAINER.LANGUAGE}
        </Text>
        <View style={styles.languageItem}>
          <Text
            style={[
              styles.languageText,
              { color: colors.text },
              i18n.language === 'es' && [styles.selectedLanguage, { color: colors.tint }],
            ]}
            onPress={() => changeLanguage('es')}
          >
            {messages.CONTAINER.SPANISH}
          </Text>
          <Text
            style={[
              styles.languageText,
              { color: colors.text },
              i18n.language === 'en' && [styles.selectedLanguage, { color: colors.tint }],
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
