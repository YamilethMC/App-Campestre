import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.primary,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gray200,
      height: 110,
    },
    headerContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    leftContainer: {
      width: 40,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginRight: 8,
    },
    rightContainer: {
      width: 40,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginLeft: 8,
    },
    iconContainer: {
      width: 40,
      height: 40,
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
      marginTop: 25,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.white,
    },
    subtitle: {
      fontSize: 14,
      fontWeight: '400',
      color: COLORS.white,
    },
    backButton: {
      width: 40,
      height: 40,
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
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