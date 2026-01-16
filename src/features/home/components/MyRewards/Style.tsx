import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.gray800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.gray800,
    marginLeft: 10,
  },
  rewardsContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  rewardsHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  rewardsTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 5,
  },
  rewardsSubtitle: {
    fontSize: 13,
    color: '#A78BFA',
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#F0FDF9',
    borderRadius: 12,
  },
  pointsInfo: {
    flex: 1,
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    marginBottom: 4,
  },
  validityText: {
    fontSize: 13,
    color: COLORS.primaryDark,
    fontWeight: '500',
  },
  pointsValueContainer: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.white, // White background for the points
    padding: 8,
    borderRadius: 8,
  },
  pointsValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  starIcon: {
    marginRight: 8,
    textShadowColor: COLORS.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  catalogButton: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  catalogButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    padding: 14,
    borderRadius: 2,
    marginTop: 10,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
});

export default styles;