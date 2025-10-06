import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
  },
  imageContainer: {
    marginBottom: 12,
  },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.gray200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.gray500,
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray600,
    marginBottom: 12,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: COLORS.gray600,
    marginLeft: 6,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  tagText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  categoryTagText: {
    color: COLORS.gray700,
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default styles;