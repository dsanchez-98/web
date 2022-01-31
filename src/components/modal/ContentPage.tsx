/* eslint-disable no-extra-semi */
import Typography from 'components/typography'
import React, { FC, useEffect, useState } from 'react'
import { View, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { usePageService } from 'services/bm'
import { Page } from 'services/types'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import { PropsContent } from './types'
import {
  StyleSheet as RStyleSheet,
  useResponsiveStyles
} from 'components/responsiveLayout'
import Button from './components/Button'

const ContentPage: FC<PropsContent<{ pageType: number }>> = (props) => {
  const { pageList, showPageWithSlug } = usePageService()
  const [page, setPage] = useState<Page>()
  const { styles } = useResponsiveStyles(rStyles)

  useEffect(() => {
    ;(async () => {
      try {
        const pages = await pageList()
        const findPage = pages.data.items.find(
          (item) => item.id === props.params?.pageType
        )
        if (findPage) {
          const page = await showPageWithSlug(findPage?.slug)
          setPage(page.data)
        }
      } catch (error) {
        props.hideModal()
      }
    })()
  }, [])

  const content = !page ? (
    <View style={nStyles.containerLoading}>
      <ActivityIndicator color={colors.primary} size={'large'} />
    </View>
  ) : (
    <>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <Typography
          content={page.title}
          fontFamily={fonts.baloo2Bold700}
          style={{ alignSelf: 'center', padding: 10 }}
        />
        <Typography content={page.body} />
      </ScrollView>
      <Button
        type="accept"
        title="Aceptar"
        style={nStyles.buttonAccept}
        onPress={() => props.hideModal()}
      />
    </>
  )

  return <View style={styles.container}>{content}</View>
}

const rStyles = RStyleSheet.create({
  container: {
    width: 400,
    height: 500,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden'
  }
})

const nStyles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonAccept: { alignSelf: 'center', margin: 15 }
})

export default ContentPage
