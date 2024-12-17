export default {
  expo: {
    name: 'yiqi-mobile',
    slug: 'yiqi-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'dark',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.andinolabs.yiqi',
      config: {
        apiKey: process.env.IOS_MAPS_API
      }
    },
    android: {
      softwareKeyboardLayoutMode: 'pan',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: 'com.andinolabs.yiqi',
      config: {
        googleMaps: {
          apiKey: process.env.ANDROID_MAPS_API
        }
      }
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png'
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
  }
}
