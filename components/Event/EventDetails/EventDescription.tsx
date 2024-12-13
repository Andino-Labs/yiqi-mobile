import React from 'react'
import { Text, useWindowDimensions } from 'react-native'
import WebView from 'react-native-webview'
import IframeRenderer, { iframeModel } from '@native-html/iframe-plugin'
import RenderHtml from 'react-native-render-html'

const renderers = {
  iframe: IframeRenderer
}

const customHTMLElementModels = {
  iframe: iframeModel
}

export default function EventDescription({
  description
}: {
  description?: string
}) {
  const { width } = useWindowDimensions()
  const contentWidth = width * 0.9

  if (!description)
    return <Text style={{ color: 'gray' }}>No event description.</Text>

  return (
    <RenderHtml
      renderers={renderers}
      WebView={WebView}
      source={{
        html: description
      }}
      contentWidth={contentWidth}
      customHTMLElementModels={customHTMLElementModels}
      defaultWebViewProps={{ allowsFullscreenVideo: true }}
      renderersProps={{
        iframe: {
          scalesPageToFit: false,
          webViewProps: {
            allowsFullscreenVideo: true,
            javaScriptEnabled: true,
            domStorageEnabled: true
          }
        }
      }}
      baseStyle={{
        color: 'white', // Dark mode text color
        backgroundColor: 'bg-gray-900' // Dark mode background
      }}
      tagsStyles={{
        iframe: {
          width: '100%',
          height: 200
        },

        a: {
          textDecorationLine: 'none'
        },
        blockquote: {
          padding: 10,
          borderLeftWidth: 4,
          color: 'white'
        }
      }}
    />
  )
}
