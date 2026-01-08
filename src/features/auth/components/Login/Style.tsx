import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
<<<<<<< HEAD
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
  inputError: {
    borderWidth: 1,
    borderColor: COLORS.warning,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.white,
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
    color: COLORS.primaryLight,
    fontSize: 14,
  },
  inputPlaceholder: {
    color: COLORS.gray500,
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.white,
    paddingRight: 48,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    padding: 8,
  },
  eyeIconText: {
    fontSize: 20,
  },
});
=======
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
      borderWidth: 2,
      borderColor: COLORS.gray300,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: COLORS.white,
      color: COLORS.gray900,
    },
    inputError: {
      borderWidth: 2,
      borderColor: COLORS.warning,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: COLORS.white,
      color: COLORS.gray900,
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
      color: COLORS.primaryLight,
      fontSize: 14,
    },
    inputPlaceholder: {
      color: COLORS.gray500,
    },
    passwordContainer: {
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
    },
    passwordInput: {
      flex: 1,
      borderWidth: 2,
      borderColor: COLORS.gray300,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: COLORS.white,
      paddingRight: 48,
      color: COLORS.gray900,
    },
    passwordInputError: {
      borderColor: COLORS.warning,
    },
    eyeIcon: {
      position: 'absolute',
      right: 12,
      padding: 8,
    },
    eyeIconText: {
      fontSize: 20,
    },
    errorText: {
      color: COLORS.error,
      fontSize: 12,
      marginTop: 4,
    },
    loginButtonDisabled: {
      opacity: 0.6,
    },
  });
>>>>>>> d251b39a25dc3ac690b806c8c15ba4a0f6985b99

export default styles;
