export default {
  expo: {
    name: 'yiqi-mobile',
    slug: 'yiqi-mobile',
    version: '1.0.2',
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
      buildNumber: 1,
      supportsTablet: true,
      bundleIdentifier: 'com.andinolabs.yiqi',
      config: {
        apiKey: process.env.IOS_MAPS_API
      }
    },
    android: {
      package: 'com.andinolabs.yiqi',
      versionCode: 4,
      softwareKeyboardLayoutMode: 'pan',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
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
