import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 40, // Ajusta este valor para mover todo el header hacia abajo
      backgroundColor: COLORS.primaryExtraDark,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gray200,
      height: 100,
    },
    leftContainer: {
      width: 40,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    rightContainer: {
      width: 40,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    iconContainer: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.white,
    },
    backButton: {
      position: 'absolute',
      left: 16,
      top: 40,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default styles;