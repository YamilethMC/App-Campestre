import React from 'react';
import { Image, Text, View } from 'react-native';

// Styles
import styles from './Style';

// Messages
import useMessages from '../../hooks/useMessages';

const Logo = () => {
  const { messages } = useMessages();
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>{messages.LOGO.TITLE}</Text>
      <Text style={styles.subtitleText}>{messages.LOGO.SUBTITLE}</Text>
      <Image
        source={require('../../../../../assets/images/auth/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;
