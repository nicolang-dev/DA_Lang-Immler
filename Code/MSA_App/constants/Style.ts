/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/*
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,{}
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
*/
import { StyleSheet } from "react-native"

export const Colors = {
  black: '#131515',
  grey: '#2B2C28',
  darkTurquoise: '#339989',
  lightTurquoise: '#7DE2D1',
  white: '#FFFAFB',
  red: '#d90b0b',
  lightGrey: '#3e403a'
}

export const GlobalStyle = StyleSheet.create({
  textBig: {
    fontSize: 20,
    color: Colors.white
  },
  textMedium: {
    fontSize: 15,
    color: Colors.white
  },
  page: {
    flex: 1,
    backgroundColor: Colors.black
  },
  button: {
    color: Colors.lightTurquoise
  }
})