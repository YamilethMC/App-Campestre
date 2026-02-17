import React from 'react';
import { Image, Text, View } from 'react-native';

// Styles
import styles from './Style';

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <View style={styles.logoCircle}>
        <Image 
          source={require('../../../../../assets/images/auth/SELLO.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.logoText}>CLUB CAMPESTRE</Text>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.subtitleText}>TAMPICO</Text>
        <View style={styles.divider} />
      </View>
    </View>
  );
};

export default Logo;
