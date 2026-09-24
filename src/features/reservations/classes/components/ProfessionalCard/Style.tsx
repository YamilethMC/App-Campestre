import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../shared/theme/colors';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
  },
  avatarFallback: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '1A',
  },
  initials: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  discipline: {
    fontSize: 14,
    color: COLORS.gray600,
    marginTop: 2,
  },
  credential: {
    fontSize: 13,
    color: COLORS.gray500,
    marginTop: 2,
  },
  actionButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  actionText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;
