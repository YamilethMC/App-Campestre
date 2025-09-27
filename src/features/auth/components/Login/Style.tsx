import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
    content: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: COLORS.gray700,
      fontWeight: '500',
    },
    input: {
      borderWidth: 1,
      borderColor: COLORS.gray300,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: COLORS.white,
    },
    inputPlaceholder: {
      color: COLORS.gray400,
    },
    loginButton: {
      backgroundColor: COLORS.primaryExtraDark,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
    forgotPasswordButton: {
      marginTop: 16,
      alignItems: 'center',
    },
    linkText: {
      color: COLORS.primaryDark,
      fontSize: 14,
    },
  });

  export default styles;