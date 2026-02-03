// Font sizes for better readability (especially for older users)
export const FONT_SIZES = {
  // Extra small - captions, badges
  xs: 12,
  
  // Small - secondary text, labels
  sm: 14,
  
  // Base - body text, descriptions
  base: 16,
  
  // Medium - emphasized body text
  md: 17,
  
  // Large - subheadings, card titles
  lg: 18,
  
  // Extra large - section titles
  xl: 20,
  
  // 2XL - screen titles
  '2xl': 24,
  
  // 3XL - hero text
  '3xl': 28,
} as const;

// Line heights for better readability
export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

// Font weights
export const FONT_WEIGHTS = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

// Common text styles for accessibility
export const TEXT_STYLES = {
  // Body text - optimized for readability
  body: {
    fontSize: FONT_SIZES.base,
    lineHeight: FONT_SIZES.base * LINE_HEIGHTS.normal,
  },
  
  // Large body text for important content
  bodyLarge: {
    fontSize: FONT_SIZES.md,
    lineHeight: FONT_SIZES.md * LINE_HEIGHTS.normal,
  },
  
  // Card titles
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: FONT_SIZES.lg * LINE_HEIGHTS.tight,
  },
  
  // Section headers
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: FONT_SIZES.xl * LINE_HEIGHTS.tight,
  },
  
  // Screen titles
  screenTitle: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: FONT_SIZES['2xl'] * LINE_HEIGHTS.tight,
  },
  
  // Labels and captions
  caption: {
    fontSize: FONT_SIZES.sm,
    lineHeight: FONT_SIZES.sm * LINE_HEIGHTS.normal,
  },
  
  // Button text
  button: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    letterSpacing: 0.3,
  },
} as const;

export type FontSizeType = keyof typeof FONT_SIZES;
