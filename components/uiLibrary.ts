import ColorToken from './colorsToken.json';
export const colorToken = ColorToken;

// Imporant!!!
// Please don't change this value, if you have any issue please contact Barak(bz7907) or Einat(ev1344)
// For more details read the wiki - https://wiki.web.att.com/display/myattmobile/UI+Library

//  #region - 1.Spacing, grid, margins
// SPACING_BASE = 8;
export enum Spacing {
  XS = 4,
  S = 8,
  M = 16,
  L = 24,
  XL = 32,
  '2XL' = 40,
  '3XL' = 48,
  '4XL' = 56,
  '5XL' = 64,
}

//  #endregion

//  #region - 2.Typography

export enum FontsFamily {
  SANS_BOLD = 'ATTAleckSans-Bold',
  SANS_MEDIUM = 'ATTAleckSans-Medium',
  SANS_REGULAR = 'ATTAleckSans-Regular',
}

export enum FontSize {
  XXS = 10,
  XS = 12,
  S = 14,
  M = 16,
  L = 18,
  XL = 20,
  '2XL' = 24,
  '3XL' = 28,
  '4XL' = 32,
}

export enum FontWeight {
  REGULAR = 'normal',
  MEDIUM = '600',
  BOLD = 'bold',
}

export enum LineHeight {
  XXS = 12,
  XS = 16,
  S = 20,
  M = 24,
  L = 28,
  XL = 32,
  '2XL' = 36,
  '3XL' = 40,
  '4XL' = 44,
}

export enum LetterSpacing {
  XXS = -0.58,
  XS = -0.5,
  S = -0.43,
  M = -0.36,
  L = -0.32,
  XL = -0.29,
  '2XL' = 0,
}

// #endregion

// #region - 3.Colors & Opacity

// Opacity
export enum Opacity {
  HIDE = 0,
  XXS = 0.05,
  XS = 0.1,
  S = 0.2,
  M = 0.4,
  L = 0.6,
  XL = 0.8,
}

// #endregion

// #region - 4.Corner Radius

export enum BorderRadius {
  S = 5,
  M = 8,
  L = 12,
  XL = 18,
}

// #endregion

// #region - 5.Drop Shadows

export const shadow = {
  sm: {
    shadowColor: colorToken.colorBlack,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.18,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colorToken.colorBlack,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  lg: {
    shadowColor: colorToken.colorBlack,
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
};

// #endregion
