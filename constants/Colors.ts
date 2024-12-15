/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4'
const tintColorDark = '#04F1FF'

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFFFF',
    cardBackground: '#ECEDEE',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    success: '#28A745', // Green for success
    error: '#DC3545', // Red for error
    warning: '#FFC107' // Yellow for warning
  },
  dark: {
    text: '#ECEDEE',
    background: '#000',
    cardBackground: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    success: '#17D47D', // Neon green for success
    error: '#FF6B6B', // Bright red for error
    warning: '#FFD56B' // Soft yellow for warning
  }
}
