type Size = {
  none: number;
  extraSmall: number;
  small: number;
  regular: number;
  medium: number;
  large: number;
  circle: number;
};

export type Spacing = {
  none: number;
  extraSmall: number;
  small: number;
  regular: number;
  medium: number;
  large: number;
  extraLarge: number;
};

export interface Border {
  radius: Size;
  size: Size;
}

const hitslopsPattern = (size: number) => {
  return {
    left: size,
    right: size,
    top: size,
    bottom: size,
  };
};

export const hitSlops = {
  none: hitslopsPattern(0),
  small: hitslopsPattern(4),
  regular: hitslopsPattern(8),
  medium: hitslopsPattern(12),
  large: hitslopsPattern(16),
};

export const spacing: Spacing = {
  none: 0,
  extraSmall: 4,
  small: 6,
  regular: 12,
  medium: 16,
  large: 24,
  extraLarge: 36,
};

export const border: Border = {
  radius: {
    none: 0,
    extraSmall: 4,
    small: 8,
    regular: 12,
    medium: 16,
    large: 36,
    circle: 50,
  },
  size: {
    none: 0,
    extraSmall: 4,
    small: 8,
    regular: 12,
    medium: 16,
    large: 24,
    circle: 50,
  },
};
