import { ExpoConfig, ConfigContext } from 'expo/config'
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'yiqi-mobile',
  slug: 'yiqi-mobile',
  version: '1.0.2',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'yiqi',
  userInterfaceStyle: 'dark',
  backgroundColor: '#000',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000'
  },
  ios: {
    buildNumber: '1',
    supportsTablet: true,
    bundleIdentifier: 'com.andinolabs.yiqi',
    config: {
      googleMapsApiKey: process.env.IOS_MAPS_API
    }
  },
  android: {
    package: 'com.andinolabs.yiqi',
    versionCode: 4,
    softwareKeyboardLayoutMode: 'pan',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#000'
    },
    splash: {
      backgroundColor: '#000'
    },
    config: {
      googleMaps: {
        apiKey: process.env.ANDROID_MAPS_API
      }
    }
  },

  plugins: [
    'expo-router',
    [
      '@react-native-google-signin/google-signin',
      {
        iosUrlScheme: process.env.GOOGLE_WEB_CLIENT
      }
    ],
    'expo-secure-store',
    'expo-localization',
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/GeistMonoVF.woff',
          './assets/fonts/GeistVF.woff'
        ]
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  }
})
