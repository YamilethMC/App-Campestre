import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Switch, Text, View, useColorScheme } from 'react-native';
import { Colors } from '../../../../constants/theme';

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
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
      <View style={[styles.section, { backgroundColor: colors.background, shadowColor: colors.text }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('settings.appearance')}</Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: colors.text }]}>{t('settings.darkMode')}</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.tint }}
            thumbColor={isDarkMode ? colors.tint : colors.background}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.background, shadowColor: colors.text }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('settings.notifications')}</Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, { color: colors.text }]}>{t('settings.enableNotifications')}</Text>
          <Switch
            trackColor={{ false: '#767577', true: colors.tint }}
            thumbColor={isDarkMode ? colors.tint : colors.background}
            onValueChange={toggleNotifications}
            value={notificationsEnabled}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.background, shadowColor: colors.text }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{t('settings.language')}</Text>
        <View style={styles.languageItem}>
          <Text 
            style={[
              styles.languageText, 
              { color: colors.text },
              i18n.language === 'es' && [styles.selectedLanguage, { color: colors.tint }]
            ]}
            onPress={() => changeLanguage('es')}
          >
            Español
          </Text>
          <Text 
            style={[
              styles.languageText, 
              { color: colors.text },
              i18n.language === 'en' && [styles.selectedLanguage, { color: colors.tint }]
            ]}
            onPress={() => changeLanguage('en')}
          >
            English
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  languageText: {
    fontSize: 16,
    padding: 8,
  },
  selectedLanguage: {
    fontWeight: '600',
  },
});

export default SettingsScreen;
