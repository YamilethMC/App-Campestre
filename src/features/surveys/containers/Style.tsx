import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  // Header styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    elevation: 2,
    shadowColor: COLORS.gray800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginRight: 12,
  },
  backIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 100, // Extra space for bottom padding
  },
  contentContainer: {
    flex: 1,
  },
  surveysList: {
    marginTop: 16,
    gap: 12,
  },
  scrollView: {
    flex: 1,
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
    paddingTop: 20,
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: COLORS.gray800,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  navButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    marginBottom: 80, // Add bottom margin to ensure button is above tab bar
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
  loadingMoreContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  loadingMoreText: {
    fontSize: 14,
    color: COLORS.gray600,
    fontStyle: 'italic',
  },
  paginationInfoContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  paginationInfoText: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  paginationControlsContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
  paginationArrowButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  paginationArrowButtonDisabled: {
    opacity: 0.3,
  },
  paginationArrowButtonText: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.gray700,
  },
  paginationArrowButtonTextDisabled: {
    color: COLORS.gray400,
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  pageNumberButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  pageNumberButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.gray700,
  },
  currentPageButton: {},
  currentPageButtonText: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
  },
  noSurveysContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noSurveysText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
  },
});

export default styles;
