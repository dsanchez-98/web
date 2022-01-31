import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Share, TextInput, Platform } from 'react-native'
import NetworkRequestInfo from 'react-native-network-logger/src/NetworkRequestInfo'
import { useThemedStyles, Theme } from 'react-native-network-logger/src/theme'
import { backHandlerSet } from 'react-native-network-logger/src/backHandler'
import ResultItem from './ResultItem'
import Header from './Header'
import Button from './Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import WebView from 'react-native-webview'

const JSONTree = require('react-native-json-tree').default

const theme = {
  scheme: 'twilight',
  author: 'david hart (http://hart-dev.com)',
  base00: '#1e1e1e',
  base01: '#323537',
  base02: '#464b50',
  base03: '#5f5a60',
  base04: '#838184',
  base05: '#a7a7a7',
  base06: '#c3c3c3',
  base07: '#ffffff',
  base08: '#cf6a4c',
  base09: '#cda869',
  base0A: '#f9ee98',
  base0B: '#8f9d6a',
  base0C: '#afc4db',
  base0D: '#7587a6',
  base0E: '#9b859d',
  base0F: '#9b703f'
}
interface Props {
  request: NetworkRequestInfo
  onClose(): void
}

const Headers = ({ title = 'Headers', headers }: { title: string; headers?: Object }) => {
  const styles = useThemedStyles(themedStyles)
  return (
    <View>
      <Header shareContent={headers && JSON.stringify(headers, null, 2)}>{title}</Header>
      <View style={styles.content}>
        {Object.entries(headers || {}).map(([name, value]) => (
          <View style={styles.headerContainer} key={name}>
            <Text style={styles.headerKey}>{name}: </Text>
            <Text style={styles.headerValue}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const LargeText: React.FC<{ children: string }> = ({ children }) => {
  const styles = useThemedStyles(themedStyles)

  if (Platform.OS === 'ios') {
    /**
     * A readonly TextInput is used because large Text blocks sometimes don't render on iOS
     * See this issue https://github.com/facebook/react-native/issues/19453
     * Note: Even with the fix mentioned in the comments, text with ~10,000 lines still fails to render
     */
    return (
      <TextInput style={[styles.content, styles.largeContent]} multiline editable={false}>
        {children}
      </TextInput>
    )
  }

  return (
    <View style={styles.largeContent}>
      <ScrollView nestedScrollEnabled>
        <View>
          <Text style={styles.content}>{children}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const RenderBody = ({ data, headers }: any) => {
  const contentType = headers['content-type']
    ? headers['content-type']
    : headers['Content-Type']
    ? headers['Content-Type']
    : ''
  const isHtml = contentType?.indexOf('html') !== -1
  const types = isHtml
    ? [{ id: 'html', name: 'HTML' }]
    : [
        { id: 'text', name: 'Text' },
        { id: 'json', name: 'JSON' }
      ]
  const [type, setType] = useState(isHtml ? 'html' : 'text') // text - json - html
  const [json, setJson] = useState({})
  const styles = useThemedStyles(themedStyles)

  useEffect(() => {
    try {
      setJson(JSON.parse(data))
    } catch (error) {}
  }, [data])

  return (
    <View>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', padding: 5 }}>
          {types.map((t) => {
            const isSelected = type === t.id
            return (
              <TouchableOpacity
                key={t.id}
                style={{
                  backgroundColor: isSelected ? 'gray' : 'white',
                  padding: 5
                }}
                onPress={() => {
                  setType(t.id)
                }}
              >
                <Text style={{ color: isSelected ? 'white' : 'black' }}>{t.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
      {type === 'text' && <LargeText>{data}</LargeText>}
      {type === 'json' && <JSONTree data={json} theme={theme} />}
      {type === 'html' && (
        <View style={{ maxHeight: 500 }}>
          <ScrollView nestedScrollEnabled>
            <WebView
              source={{ html: data }}
              style={{ height: 500 }}
              setSupportMultipleWindows
              userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
            />
          </ScrollView>
        </View>
      )}
    </View>
  )
}
const RequestDetails: React.FC<Props> = ({ request, onClose }) => {
  const [responseBody, setResponseBody] = useState('Loading...')
  const styles = useThemedStyles(themedStyles)

  useEffect(() => {
    ;(async () => {
      const body = await request.getResponseBody()
      setResponseBody(body)
    })()
  }, [request])

  const requestBody = request.getRequestBody()

  const getFullRequest = () => {
    let response
    if (responseBody) {
      try {
        response = JSON.parse(responseBody)
      } catch {
        response = `${responseBody}`
      }
    }
    const processedRequest = {
      ...request,
      response,
      duration: request.duration
    }
    return JSON.stringify(processedRequest, null, 2)
  }

  return (
    <View style={styles.container}>
      <ResultItem request={request} style={styles.info} />
      <ScrollView style={styles.scrollView} nestedScrollEnabled>
        <Headers title="Request Headers" headers={request.requestHeaders} />
        <Header shareContent={requestBody}>Request Body</Header>
        <RenderBody data={requestBody} headers={request.requestHeaders} />
        <Headers title="Response Headers" headers={request.responseHeaders} />
        <Header shareContent={responseBody}>Response Body</Header>
        <RenderBody data={responseBody} headers={request.responseHeaders} />
        <Button onPress={() => Share.share({ message: getFullRequest() })} fullWidth>
          Compartir todo el Request
        </Button>
        <Button onPress={() => Share.share({ message: request.curlRequest })} fullWidth>
          Compartir con cURL
        </Button>
      </ScrollView>
      {!backHandlerSet() && (
        <Button onPress={onClose} style={styles.close}>
          Cerrar
        </Button>
      )}
    </View>
  )
}

const themedStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 10
    },
    info: {
      margin: 0
    },
    close: {
      position: 'absolute',
      right: 10,
      top: 0
    },
    scrollView: {
      width: '100%'
    },
    headerContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    headerKey: { fontWeight: 'bold', color: theme.colors.text },
    headerValue: { color: theme.colors.text },
    text: {
      fontSize: 16,
      color: theme.colors.text
    },
    content: {
      backgroundColor: theme.colors.card,
      padding: 10,
      color: theme.colors.text
    },
    largeContent: {
      maxHeight: 300
    }
  })

export default RequestDetails
