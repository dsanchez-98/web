import React, { FC } from 'react'
import { View } from 'react-native'
import Typography from 'components/typography'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import Theme from 'components/theme'
import { shadow } from 'styles/shadow'
import { useResponsiveStyles } from 'components/responsiveLayout'

interface Props {}

const Footer: FC<Props> = () => {
  const { isMobile } = useResponsiveStyles({})
  return (
    <Theme.View
      scheme="background"
      style={{ height: 70, overflow: 'hidden', paddingBottom: 10 }}
    >
      <Theme.View
        style={[
          {
            flex: 1,
            marginHorizontal: isMobile ? 0 : 15,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            flexDirection: 'row',
            paddingHorizontal: 15
          },
          isMobile ? {} : shadow
        ]}
        scheme="primary"
      >
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* <View style={{ flexDirection: 'row', height: 30 }}>
                <Icon name="arrowRight" />
                <Typography content="1-2" />
                <Icon name="arrowRight" />
              </View> */}
            {/* <InputDropdown
                items={new Array(6)
                  .fill(0)
                  .map((_, index) => ({ label: `${index + 1}`, value: index + 1 }))}
                placeholder={'pagina'}
                style={{ width: 80 }}
                inputHeight={30}
              /> */}
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Typography
            content="Total"
            fontFamily={fonts.baloo2SemiBold600}
            style={{ marginHorizontal: 50 }}
            size={fontSize.large}
          />
          <Typography
            content="S/575.00"
            fontFamily={fonts.baloo2SemiBold600}
            size={fontSize.large}
          />
        </View>
      </Theme.View>
    </Theme.View>
  )
}

export default Footer
