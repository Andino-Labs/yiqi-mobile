import { Button, Modal, View } from 'react-native'
import { FC, useState } from 'react'
import WebView from 'react-native-webview'
import uuid from 'react-native-uuid'
import queryString from 'query-string'
import { ThemedView } from './ui/ThemedView'

interface ILinkedInModalProps {
  isVisible: boolean
  onLoginCancel: () => void
  onLoginSuccess: (authrozationCode: string) => void
  onError?: (err: string) => void
}
const getUrlParam = (url: string, param: string) => {
  const parsedQueryString = queryString.parse(url.split('?')[1])
  return parsedQueryString[param]
}

const LinkedInModal: FC<ILinkedInModalProps> = ({
  isVisible,
  onLoginSuccess,
  onLoginCancel,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true)
  // Generate a random string for state param in linkedin authorization url
  // This state is to prevent CSRF attack, read more at https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fcontext&view=li-lms-2022-07&tabs=HTTPS1#step-2-request-an-authorization-code
  const authorizationState = uuid.v4()
  const handleNavigationStateChange = async (event: any) => {
    const { url } = event

    const callbackUrl = process.env.EXPO_PUBLIC_LINKEDIN_REDIRECT_URI + '/?code'
    if (!url || !callbackUrl) return onLoginCancel()

    if (url.startsWith('https://www.linkedin.com/oauth/v2/login-cancel')) {
      return onLoginCancel()
    }

    if (url.startsWith(callbackUrl)) {
      const code = getUrlParam(url, 'code') as string // Get authorization code from linkedin

      if (!code) {
        console.error('Cannot get authorization code from linkedin')
      }

      const state = getUrlParam(url, 'state') as string // Get state from linkedin
      if (!state || state !== authorizationState) {
        console.error('Authorization state does not match')
      }
      onLoginSuccess(code)
    }
  }
  const scope = encodeURIComponent('openid profile email')

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      presentationStyle="pageSheet"
    >
      <ThemedView>
        {!isLoading ? (
          <ThemedView className="h-14 w-full justify-center border-b-2 border-gray-light bg-gray-veryLight pl-6">
            <Button title={'Cancel'} onPress={onLoginCancel} />
          </ThemedView>
        ) : null}
        <View
          style={{
            backgroundColor: 'red',
            height: '90%',
            display: 'flex'
          }}
        >
          <WebView
            source={{
              uri: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.EXPO_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.EXPO_PUBLIC_LINKEDIN_REDIRECT_URI}&scope=${scope}&state=${authorizationState}`
            }}
            contentMode="mobile"
            automaticallyAdjustContentInsets={false}
            onNavigationStateChange={handleNavigationStateChange}
            thirdPartyCookiesEnabled={true}
            onLoad={() => setIsLoading(false)}
            incognito
          />
        </View>
      </ThemedView>
    </Modal>
  )
}

export default LinkedInModal
