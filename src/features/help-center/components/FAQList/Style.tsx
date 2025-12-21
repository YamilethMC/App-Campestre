import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    gap: 12,
  },
  faqCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
    marginRight: 10,
  },
  answerContainer: {
    padding: 16,
    paddingTop: 8,
  },
  answerText: {
    fontSize: 14,
    color: COLORS.gray700,
    lineHeight: 20,
  },
});

export default styles;
