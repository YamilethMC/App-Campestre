import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoTampicoContainer: {
    alignItems: 'center',
  },
  logoTampico: {
    width: 120,
    height: 40,
    marginBottom: 8,
  },
  accountText: {
    fontSize: 14,
    color: COLORS.gray600,
    fontWeight: '400',
  },
  formCardInner: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 16,
    padding: 15,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
    borderColor: COLORS.gray200,
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
    backgroundColor: COLORS.primaryDark,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
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
    color: COLORS.primary,
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
    borderColor: COLORS.gray200,
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
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerDivider: {
    width: 30,
    height: 1,
    backgroundColor: COLORS.gray300,
    marginHorizontal: 8,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.gray500,
    fontWeight: '400',
  },
});

export default styles;