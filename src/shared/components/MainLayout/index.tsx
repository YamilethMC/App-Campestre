import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { COLORS } from '../../theme/colors';
import MainHeader from '../MainHeader/Container';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  showNotifications?: boolean;
  scrollable?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  showNotifications = true,
  scrollable = true,
}) => {
  const Container = scrollable ? ScrollView : View;

  return (
    <View style={styles.container}>
      <MainHeader title={title} showNotifications={showNotifications} />
      <Container style={styles.content}>{children}</Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default MainLayout;
