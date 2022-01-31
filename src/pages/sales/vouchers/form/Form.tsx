import React, { FunctionComponent as FC, useCallback, useRef } from 'react'
import { FlatList, View, ScrollView } from 'react-native'
import Theme from 'components/theme'
import { useCollapseScrollV2 } from 'hooks/useCollapseScroll'
import Toolbar, { HEIGHT as TOOLBAR_HEIGHT } from 'components/toolbar'
import useAppContext from 'hooks/useAppContext'
import ItemProduct from './components/ItemProduct'
import Footer from './components/Footer'
import Header, { HEIGHT as HEADER_HEIGHT } from './components/Header'
import ContextForm, { useContextForm } from './ContextForm'
import ProductsModal from './components/ProductsModal'
import CustomersModal from './components/CustomerModal'
import InputProduct from './components/InputProduct'
import InputCustomer from './components/InputCustomer'
import { useResponsiveStyles } from 'components/responsiveLayout'
import { shadow } from 'styles/shadow'
import Animated, { useAnimatedScrollHandler } from 'components/reanimated'

const AScrollView = Animated.createAnimatedComponent(ScrollView)
interface Props {}

const Form: FC<Props> = (props) => {
  const refScrollView = useRef<any>(null)
  const { showModal } = useAppContext()
  const { addedProducts } = useContextForm()
  addedProducts.hookSetListener()
  const { isMobile } = useResponsiveStyles({})

  const height = TOOLBAR_HEIGHT - 10
  const { RStyle, scrollHandler } = useCollapseScrollV2({
    height
  })
  const heightItem = isMobile ? 60 : 50

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <ItemProduct
          heightItem={heightItem}
          item={item}
          index={index}
          onDelete={() => {
            showModal({
              title: 'Aviso',
              message: `¿Eliminar el producto ${item.name}?`,
              onAccept: () => {
                addedProducts.remove(item as any)
              },
              onCancel: () => {}
            })
          }}
        />
      )
    },
    [heightItem]
  )

  const onScroll = useAnimatedScrollHandler((e, ctx) => {
    scrollHandler()?.onScroll?.(e, ctx)
  })

  return (
    <View style={{ flex: 1 }}>
      <Theme.View
        scheme={isMobile ? 'background' : 'primary'}
        style={[{ marginHorizontal: isMobile ? 0 : 15, flex: 1 }, shadow]}
      >
        <FlatList
          style={{ flex: 1 }}
          focusable
          ref={refScrollView}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          data={addedProducts.value}
          renderScrollComponent={(props) => (
            <AScrollView {...props} onScroll={onScroll} />
          )}
          getItemLayout={(_, index) => ({
            length: heightItem,
            offset: heightItem * index,
            index
          })}
          keyExtractor={(item, index) => item.id.toString()}
          ListHeaderComponent={() => (
            <View
              style={{
                paddingTop: TOOLBAR_HEIGHT + (isMobile ? 0 : HEADER_HEIGHT)
              }}
            >
              {isMobile && <Header />}
              <InputCustomer />
              <InputProduct />
            </View>
          )}
          renderItem={renderItem}
        />
        <Footer />
      </Theme.View>
      <Theme.View
        scheme="border"
        style={{
          flex: 1,
          height: height,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          elevation: 3
        }}
        animatedStyles={isMobile ? RStyle : {}}
      >
        <Toolbar />
        {!isMobile && <Header />}
      </Theme.View>
    </View>
  )
}

export default () => {
  return (
    <ContextForm>
      <Form />
      <ProductsModal />
      <CustomersModal />
    </ContextForm>
  )
}
