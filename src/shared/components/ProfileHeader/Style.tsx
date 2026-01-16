import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: COLORS.gray200,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.gray900,
  },
  memberId: {
    marginTop: 4,
    color: COLORS.gray500,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8 as any,
  },
  membershipType: {
    color: COLORS.gray700,
    marginRight: 8,
    fontWeight: '500',
  },
  statusPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  active: {
    backgroundColor: '#DEF7EC',
  },
  inactive: {
    backgroundColor: '#FDE8E8',
  },
  statusText: {
    fontWeight: '600',
  },
  activeText: {
    color: COLORS.primaryDark,
  },
  inactiveText: {
    color: COLORS.error,
  },
});
