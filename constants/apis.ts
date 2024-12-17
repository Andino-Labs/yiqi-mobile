import { Platform } from 'react-native'

export const IS_IOS = Platform.OS === 'ios'

export const API = __DEV__
  ? `http://${
      IS_IOS
        ? process.env.EXPO_PUBLIC_IOS_API_URL
        : process.env.EXPO_PUBLIC_ANDROID_API_URL
    }:3000`
  : process.env.EXPO_PUBLIC_DEPLOYMENT_API
