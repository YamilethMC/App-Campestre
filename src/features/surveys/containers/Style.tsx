import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
    paddingBottom: 200,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 200, // Extra space for navigation buttons
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: COLORS.gray700,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  successButton: {
    width: '100%',
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
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  starIcon: {
    marginHorizontal: 4,
  },
  textInputContainer: {
    marginTop: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.gray800,
    textAlignVertical: 'top',
  },
  yesNoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  yesNoButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  multipleChoiceButton: {
    marginBottom: 8,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    elevation: 8,
    shadowColor: COLORS.gray800,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  disabledNavButton: {
    opacity: 0.6,
  },
  disabledNavButtonText: {
    color: COLORS.gray500, // Gray color that will be visible on the disabled button
  },
});

export default styles;