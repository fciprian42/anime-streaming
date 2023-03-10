export interface Typography {
  fonts: typeof fonts;
  primary: any;
}

export const fonts = {
  ubuntu: {
    medium: 'Ubuntu-Medium',
    regular: 'Ubuntu-Regular',
  },
  monospace: {
    normal: 'monospace',
  },
};

export const typography: Typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.ubuntu,
};
