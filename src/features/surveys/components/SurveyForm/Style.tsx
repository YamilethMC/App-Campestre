
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100,
  },
  headerSection: {
    marginBottom: 16,
  },
  surveyCard: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  surveyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 8,
  },
  surveyDescription: {
    fontSize: 14,
    color: COLORS.gray600,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.gray700,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  questionSection: {
    marginBottom: 16,
  },
  questionCard: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    lineHeight: 24,
  },
  requiredIndicator: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  requiredText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  answerContainer: {
    marginTop: 8,
  },
  navigationContainer: {
    paddingTop: 20,
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  disabledNavButton: {
    backgroundColor: COLORS.gray100,
    borderColor: COLORS.gray300,
  },
  disabledNavButtonText: {
    color: COLORS.gray400,
  },
  backToSurveysButton: {
    marginTop: 12,
    borderColor: COLORS.gray300,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  backIcon: {
    marginRight: 8,
  },
});

export default styles;
