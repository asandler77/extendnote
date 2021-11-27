import { StyleSheet, useColorScheme } from 'react-native';
import { useMemo } from 'react';
import { darkModeColors, lightModeColors, ColorsMode } from '@theme/colors/colorLibrary';
import { ThemeModes } from '@models/common';

/**
 * Please refer to the wiki page for more details:
 * https://wiki.web.att.com/display/myattmobile/Appearance+hooks
 * **/

export interface AppearanceInfo {
  colors: ColorsMode;
  isDarkMode: boolean;
}

export type RawStyles<T> = StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>;

export type StyleBuilder = <T extends RawStyles<T>>(colors: ColorsMode) => T | StyleSheet.NamedStyles<any>;

export type SB = StyleBuilder;
// temp backward compatibilty
export type SG = StyleBuilder;

/*
 * Please make this hook your MAIN priority for implementing dynamic colors
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useStylesWithColors = (styleBuilder: StyleBuilder) => {
  const isDarkMode = useColorScheme() === ThemeModes.DARK;
  return useMemo(() => StyleSheet.create(styleBuilder(isDarkMode ? darkModeColors : lightModeColors)), [styleBuilder, isDarkMode]);
};

/**
 * Please use this hook
 * if and only if the useStylesWithColors isn't suitable for your needs
 * */
export const useAppearance = (): AppearanceInfo => {
  const isDarkMode = useColorScheme() === ThemeModes.DARK;

  return useMemo(() => {
    const colors = isDarkMode ? darkModeColors : lightModeColors;
    return {
      colors,
      isDarkMode,
    };
  }, [isDarkMode]);
};

/**
 * Please use this hook
 * if and only if the useStylesWithColors isn't suitable for your needs
 * */
export const useColors = (): AppearanceInfo['colors'] => useAppearance().colors;

/**
 * Please use this hook
 * if and only if the useStylesWithColors isn't suitable for your needs
 * */
export const useIsDarkMode = (): AppearanceInfo['isDarkMode'] => useAppearance().isDarkMode;

/**
 * @deprecated dont use it! - will be removed soon
 * use 'useStylesWithColors' instead
 */
export const useWithAppearance = <T extends Record<string, any>>(compute: (appearance: AppearanceInfo) => T): T => {
  const appearance = useAppearance();
  return useMemo(() => compute(appearance), [compute, appearance]);
};
