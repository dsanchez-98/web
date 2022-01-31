import React, { FunctionComponent as FC, useRef, useState } from 'react'
import { View } from 'react-native'
import * as Yup from 'yup'

import { shadow } from 'styles/shadow'
import colors from 'styles/colors'
import fonts from 'styles/fonts'

import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import Image from 'components/image'
import Typography from 'components/typography'
import FormikControl from 'components/formikControl'
import TextInputArea from 'components/textInputArea'
import ScrollView from 'components/scrollView'
import Toolbar from 'components/toolbar'
import HeaderBar from 'components/searchList/componets/HeaderBar'
import NavigationText from 'components/searchList/componets/NavigationText'
import FormButtons from 'components/searchList/componets/FormButtons'
import Theme from 'components/theme'
import Icon from 'components/icon'
import InputFile from 'components/inputFile'
import Checkbox from 'components/checkbox'
import Switch from 'components/switch'

import useTranslation from 'hooks/useTranslation'
import fontSize from 'styles/fontSize'
import { useTerminalService } from 'services/bm'
import { useIgvAffectationService } from 'services/finance'
import { PRODUCTS_LIST } from '../list'
import { useRoute } from '@react-navigation/native'
import { useProductService, useUnitService } from 'services/im'
import useService from 'hooks/useService'
import BaseForm from 'components/baseForm'
import TextInput from 'components/textInput'
import useSunatProduct from 'hooks/useSunatProduct'
import { RequestCreateProduct, Terminal } from 'services/im/product/type'
import { useTypeProductService } from 'services/im/product/typeProduct'
import useAppContext from 'hooks/useAppContext'

interface Props {}

type StoreProps = {
  idStore: number
  status: boolean
  name: string
  price: number
  idAfec: number
}

type PriceStoresProps = {
  title: string
  name: string
  value: StoreProps[]
  onChange: (val: StoreProps[]) => void
}

type ProductProps = {
  productTypeId: number | null
  commercialMeasureUnitId: string
  name: string
  description: string
  code: string
  barcode: string
  weight: string
  isPurchase: boolean
  isSale: boolean
  isStorable: boolean
  sunatOpt: boolean
  cost: {
    status: boolean
    idStore: number
    price: string
    idAfec: number | null
  }[]
  sell: {
    status: boolean
    idStore: number
    price: string
    idAfec: number | null
  }[]
  codeProd: string
  segment: string
  class: string
  family: string
  product: string
}

type SwitchSunatProps = {
  value: boolean
  setFieldValue: (name: string, value: any) => void
  onChange: (val: boolean) => void
}

const SwitchSunat: FC<SwitchSunatProps> = (props) => {
  return (
    <View>
      <Switch
        value={props.value}
        onChange={(val) => {
          props.onChange(val)
          props.setFieldValue('codeProd', '')
          props.setFieldValue('product', '')
          props.setFieldValue('class', '')
          props.setFieldValue('segment', '')
          props.setFieldValue('family', '')
        }}
      />
    </View>
  )
}

const PhotoProduct = (props: any) => {
  const styleImage = { width: '282', height: '165' }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          margin: 15,
          borderWidth: 1,
          borderRadius: 10,
          overflow: 'hidden',
          borderColor: colors.borderGray
        }}
      >
        {props.value ? (
          <Image source={{ uri: props.value }} style={styleImage} />
        ) : (
          <Icon name={'preview'} height={styleImage.height} width={styleImage.width} />
        )}
      </View>
      <InputFile
        title="Cargar foto del producto"
        onChange={(img) => {
          props.onChange(URL.createObjectURL(img))
        }}
      />
    </View>
  )
}

const PriceStores = (props: PriceStoresProps) => {
  const { styles } = useResponsiveStyles(rStyles)
  const [priceAllStores, setPriceAllStores] = useState('')
  const [arrIgvAffectations] = useService(
    useIgvAffectationService,
    'affectationTypesList'
  )()
  const igvAffectations = arrIgvAffectations?.data.items.map((x) => {
    return {
      label: x.description,
      value: x.id
    }
  })

  return (
    <View style={styles.priceStore}>
      <Typography
        content={props.title}
        size={fontSize.md}
        fontFamily={fonts.baloo2Medium500}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            style={{
              marginTop: 16,
              marginRight: 8
            }}
            value={props.value.every((x) => x.status === true)}
            onChange={() => {
              if (props.value.every((x) => x.status === true)) {
                props.onChange(
                  props.value.map((y) => {
                    y.status = false
                    return y
                  })
                )
              } else {
                props.onChange(
                  props.value.map((y) => {
                    y.status = true
                    return y
                  })
                )
              }
            }}
            type="primary"
          />
          <Typography
            style={{
              marginTop: 16,
              marginRight: 8
            }}
            content={'Todas las tiendas'}
            size={fontSize.md}
            fontFamily={fonts.baloo2Medium500}
          />
        </View>
        <TextInput
          value={priceAllStores}
          onChange={(val) => {
            setPriceAllStores(val)
            props.onChange(
              props.value.map((x) => {
                x.price = val ? parseFloat(val) : 0
                return x
              })
            )
          }}
        />
      </View>
      <View style={styles.divider} />
      {props.value.map((x, k) => (
        <View
          key={k}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 16,
            flex: 1
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <FormikControl
              style={{
                marginRight: 8
              }}
              name={`${props.name}[${k}].status`}
              control="checkbox"
              type="primary"
            />
            <Typography
              style={{
                marginRight: 8
              }}
              content={x.name || 'Tienda ' + k + 1}
              size={fontSize.md}
              fontFamily={fonts.baloo2Medium500}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <FormikControl
              style={[styles.fieldsPrice, { marginRight: 10 }]}
              name={`${props.name}[${k}].price`}
              control="textInput"
            />
            <FormikControl
              style={styles.fieldsPrice}
              control="dropdown"
              name={`${props.name}[${k}].idAfec`}
              items={igvAffectations}
            />
          </View>
        </View>
      ))}
    </View>
  )
}

const ProductSunat = (props: any) => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  const { state, getSegment, getFamily, getClass, getProduct, setCurrent } =
    useSunatProduct()

  return (
    <>
      <View style={styles.containerProdCode}>
        <FormikControl name="codeProd" control="textInput" disabled={!props.value} />
        <View style={[styles.divider, { marginTop: 16 }]} />
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}
      >
        <View style={styles.secIndividualContainer}>
          <FormikControl
            control="dropdown"
            name="segment"
            placeholder={t('prodFieldSeg')}
            items={state.segment}
            dependencies={[state]}
            showSearch
            onPress={() => getSegment()}
            onItemSelect={(item, setFieldValue) => {
              if (item.value !== state.current.segmentId) {
                setCurrent('segment', item.value)
                setCurrent('family', 0)
                setCurrent('class', 0)
                setCurrent('product', 0)
                getFamily(item.value)
                setFieldValue?.('family', '')
                setFieldValue?.('class', '')
                setFieldValue?.('product', '')
              }
            }}
            disabled={props.value}
          />
        </View>
        <View style={styles.secIndividualContainer}>
          <FormikControl
            control="dropdown"
            name="family"
            placeholder={t('prodFieldFam')}
            items={state.family}
            dependencies={[state]}
            showSearch
            onPress={() => {
              getFamily(state.current.segmentId)
            }}
            onItemSelect={(item, setFieldValue) => {
              if (item.value !== state.current.familyId) {
                setCurrent('family', item.value)
                setCurrent('class', 0)
                getClass(item.value)
                setFieldValue?.('class', '')
                setFieldValue?.('product', '')
              }
            }}
            disabled={props.value}
          />
        </View>
        <View style={styles.secIndividualContainer}>
          <FormikControl
            control="dropdown"
            name="class"
            placeholder={t('prodFieldClass')}
            items={state.class}
            dependencies={[state]}
            showSearch
            // onPress={() => {
            //   getClass(state.current.familyId)
            // }}
            onItemSelect={(item, setFieldValue) => {
              setCurrent('class', item.value)
              setCurrent('product', 0)
              getProduct(item.value)
              setFieldValue?.('product', '')
            }}
            disabled={props.value}
          />
        </View>
        <View style={styles.secIndividualContainer}>
          <FormikControl
            control="dropdown"
            name="product"
            placeholder={t('prodFieldProd')}
            items={state.product}
            dependencies={[state]}
            showSearch
            onItemSelect={(item) => {
              if (item.value !== state.current.productId) {
                setCurrent('product', item.value)
              }
            }}
            disabled={props.value}
          />
        </View>
      </View>
    </>
  )
}

const Products: FC<Props> = (props) => {
  const { styles } = useResponsiveStyles(rStyles)
  const { setLoading } = useAppContext()
  const { showProduct, createProduct, updateProduct } = useProductService()
  const [arrTypeProducts] = useService(useTypeProductService, 'productTypeList')()
  const [arrUnits] = useService(useUnitService, 'listUnitOfMeasurement')()
  const [arrTerminals] = useService(useTerminalService, 'terminalsList')()
  const [arrIgvAffectations] = useService(
    useIgvAffectationService,
    'affectationTypesList'
  )()
  const igvAffectations = arrIgvAffectations?.data.items.map((x) => {
    return {
      label: x.description,
      value: x.id
    }
  })
  const typeProducts =
    arrTypeProducts?.data.items.map((x) => {
      return {
        label: x.name,
        value: x.id
      }
    }) || []
  const units =
    arrUnits?.data.items.map((x) => {
      return {
        label: x.name,
        value: x.id
      }
    }) || []
  const terminals = arrTerminals?.data.items || []
  const { isMobile } = useResponsiveStyles({})
  const { params } = useRoute<any>()
  const { t } = useTranslation()
  const formikRef = useRef(null)

  const productFormInitialValues: ProductProps = {
    productTypeId: typeProducts.length ? typeProducts[0].value : null,
    commercialMeasureUnitId: '',
    name: '',
    description: '',
    code: '',
    barcode: '',
    weight: '',
    isPurchase: false,
    isSale: false,
    isStorable: false,
    sunatOpt: true,
    cost: terminals.map((x) => {
      return {
        status: false,
        idStore: x.id,
        name: x.name,
        price: '0.00',
        idAfec: igvAffectations?.[0].value || 1
      }
    }),
    sell: terminals.map((x) => {
      return {
        status: false,
        idStore: x.id,
        name: x.name,
        price: '0.00',
        idAfec: igvAffectations?.[0].value || 1
      }
    }),
    codeProd: '',
    segment: '',
    class: '',
    family: '',
    product: ''
  }

  const validationSchema = Yup.object().shape({
    commercialMeasureUnitId: Yup.string().required(t('valReq')),
    name: Yup.string().min(3).required(t('valReq')),
    description: Yup.string().min(3).required(t('valReq')),
    code: Yup.string()
      .trim()
      .matches(/^([a-zA-Z0-9])*$/, t('alfaNum'))
      .min(9, `${t('valMinLeng')} 9 ${t('characters')}`)
      .required(t('valReq')),
    barcode: Yup.string()
      .matches(/^([0-9])*$/, t('valNum'))
      .min(9, `${t('valMinLeng')} 9 ${t('characters')}`)
      .required(t('valReq')),
    weight: Yup.string()
      .matches(/^[0-9]+([.][0-9]+)?$/, t('valRealPos'))
      .required(t('valReq')),
    cost: Yup.array().of(
      Yup.object().shape({
        price: Yup.string()
          .matches(/^[0-9]+([.][0-9]+)?$/, t('valRealPos'))
          .required(t('valReq'))
      })
    ),
    sell: Yup.array().of(
      Yup.object().shape({
        price: Yup.string()
          .matches(/^[0-9]+([.][0-9]+)?$/, t('valRealPos'))
          .required(t('valReq'))
      })
    ),
    codeProd: Yup.string().when('sunatOpt', {
      is: true,
      then: Yup.string()
        .length(8, `${t('valLength')} 8 ${t('characters')}`)
        .matches(/^([0-9])*$/, t('valNum'))
        .required(t('valReq')),
      otherwise: Yup.string()
    }),
    segment: Yup.string().when('sunatOpt', {
      is: false,
      then: Yup.string().trim().required(t('valReq')),
      otherwise: Yup.string()
    }),
    class: Yup.string().when('sunatOpt', {
      is: false,
      then: Yup.string().trim().required(t('valReq')),
      otherwise: Yup.string()
    }),
    family: Yup.string().when('sunatOpt', {
      is: false,
      then: Yup.string().trim().required(t('valReq')),
      otherwise: Yup.string()
    }),
    product: Yup.string().when('sunatOpt', {
      is: false,
      then: Yup.string().trim().required(t('valReq')),
      otherwise: Yup.string()
    })
  })

  const onSubmitProduct = async (val: ProductProps, { setSubmitting }: any) => {
    setLoading(true)
    const productTerminals: Terminal[] = []
    for (let i = 0; i < terminals.length; i++) {
      const terminalActual = terminals[0]
      const sellActual = val.sell.find((y) => y.idStore === terminalActual.id)
      const costActual = val.cost.find((y) => y.idStore === terminalActual.id)
      if (sellActual?.status || costActual?.status) {
        productTerminals.push({
          terminalId: terminalActual.id,
          priceCost: costActual?.status ? parseFloat(costActual.price) : 0,
          priceSale: sellActual?.status ? parseFloat(sellActual.price) : 0,
          priceCostTributeTypeId: costActual?.status ? costActual.idAfec : null,
          priceSaleTributeTypeId: sellActual?.status ? sellActual.idAfec : null
        })
      }
    }
    const newProduct: RequestCreateProduct = {
      barcode: val.barcode,
      code: val.code,
      commercialMeasureUnitId: val.commercialMeasureUnitId,
      description: val.description,
      isPurchase: val.isPurchase,
      isSale: val.isSale,
      isStorable: val.isStorable,
      name: val.name,
      productTypeId: val.productTypeId,
      weight: parseFloat(val.weight),
      status: true,
      productCategoryId: val.sunatOpt ? parseInt(val.codeProd) : parseInt(val.product),
      productTerminals: productTerminals
    }
    console.log(newProduct)
    try {
      if (params.id) {
        await updateProduct({ data: newProduct, id: params.id })
      } else {
        await createProduct(newProduct)
      }
    } catch (error) {
      console.log(error)
    }
    setSubmitting(false)
    navigation.navigate(PRODUCTS_LIST)
    setLoading(false)
  }

  return (
    <>
      {terminals.length && typeProducts.length && units.length && (
        <BaseForm
          callService={async (id: string) => {
            try {
              const productData = await showProduct(id)
              const toEditProductData: ProductProps = {
                barcode: productData.data.barcode,
                code: productData.data.code,
                commercialMeasureUnitId: productData.data.commercialMeasureUnitId,
                description: productData.data.description,
                isPurchase: productData.data.isPurchase === 1,
                isSale: productData.data.isSale === 1,
                isStorable: productData.data.isStorable === 1,
                name: productData.data.name,
                productTypeId: productData.data.productTypeId,
                weight: productData.data.weight?.toString() || '',
                sell: terminals.map((x) => {
                  const sellFinded = productData.data.productTerminals.find(
                    (y) => y.terminalId === x.id && y.priceSaleTributeTypeId
                  )
                  if (sellFinded) {
                    return {
                      idAfec: sellFinded.priceSaleTributeTypeId,
                      idStore: x.id,
                      name: x.name,
                      price: sellFinded.priceSale.toString(),
                      status: true
                    }
                  } else {
                    return {
                      status: false,
                      idStore: x.id,
                      name: x.name,
                      price: '0.00',
                      idAfec: igvAffectations?.[0].value || 1
                    }
                  }
                }),
                cost: terminals.map((x) => {
                  const costFinded = productData.data.productTerminals.find(
                    (y) => y.terminalId === x.id && y.priceCostTributeTypeId
                  )
                  if (costFinded) {
                    return {
                      idAfec: costFinded.priceCostTributeTypeId,
                      idStore: x.id,
                      name: x.name,
                      price: costFinded.priceCost.toString(),
                      status: true
                    }
                  } else {
                    return {
                      status: false,
                      idStore: x.id,
                      name: x.name,
                      price: '0.00',
                      idAfec: igvAffectations?.[0].value || 1
                    }
                  }
                }),
                sunatOpt: true,
                codeProd: productData.data.productCategoryId,
                class: '',
                family: '',
                product: '',
                segment: ''
              }
              return toEditProductData
            } catch (error) {
              console.log(error)
              return null
            }
          }}
          innerRef={formikRef}
          initialValues={productFormInitialValues}
          onSubmit={onSubmitProduct}
          validationSchema={validationSchema}
        >
          <ScrollView
            renderToolbar={() => <Toolbar />}
            renderHeader={() => (
              <HeaderBar
                navigationText={
                  <NavigationText
                    path={params.id ? t('prodEditPath') : t('prodNewPath')}
                  />
                }
                rigthContent={
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <FormButtons
                      hideSave={true}
                      minimal={isMobile}
                      onPressCancel={() => {
                        navigation.navigate(PRODUCTS_LIST)
                      }}
                      cancelText={t('cancel')}
                      confirmText={params.id ? t('prodEditSubBtn') : t('prodNewSubBtn')}
                    />
                    <FormikControl
                      style={{
                        height: 35,
                        width: 'auto',
                        paddingHorizontal: 8
                      }}
                      control="buttonSubmit"
                      type="primary"
                      title={params.id ? t('prodEditSubBtn') : t('prodNewSubBtn')}
                    />
                  </View>
                }
              />
            )}
            showsVerticalScrollIndicator={false}
          >
            <Theme.View
              scheme={'primary'}
              style={[{ marginHorizontal: 15, flex: 1 }, shadow]}
            >
              <View style={styles.mainContainer}>
                <View style={styles.topSectionContainer}>
                  <View style={styles.leftTopContainer}>
                    <FormikControl component={PhotoProduct} name="imgProduct" />
                    <FormikControl
                      style={{
                        width: '100%'
                      }}
                      placeholder="Tipo de producto"
                      control="dropdown"
                      name="productTypeId"
                      items={typeProducts}
                    />
                    <View style={styles.typeOperationContainer}>
                      <Typography
                        content={t('prodFieldTypeOperation')}
                        size={styles.fieldName.fontSize}
                        fontFamily={fonts.baloo2Medium500}
                      />
                      <View style={styles.compraVentaChecksContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <FormikControl
                            control="checkbox"
                            name="isPurchase"
                            type="primary"
                          />
                          <Typography
                            content={t('prodFieldCheckPurch')}
                            style={{ marginLeft: 6 }}
                            size={styles.checkLabel.fontSize}
                            fontFamily={fonts.baloo2Regular400}
                          />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <FormikControl
                            control="checkbox"
                            name="isSale"
                            type="primary"
                          />
                          <Typography
                            content={t('prodFieldCheckSell')}
                            style={{ marginLeft: 6 }}
                            size={styles.checkLabel.fontSize}
                            fontFamily={fonts.baloo2Regular400}
                          />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <FormikControl
                            control="checkbox"
                            name="isStorable"
                            type="primary"
                          />
                          <Typography
                            content={t('prodFieldCheckInvent')}
                            style={{ marginLeft: 6 }}
                            size={styles.checkLabel.fontSize}
                            fontFamily={fonts.baloo2Regular400}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rightTopContainer}>
                    <FormikControl
                      name="name"
                      control="textInput"
                      placeholder={t('prodFieldName')}
                    />
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                      <FormikControl
                        style={{ width: '45%' }}
                        name="code"
                        control="textInput"
                        placeholder={t('prodFieldIntCode')}
                      />
                      <FormikControl
                        style={{ width: '45%' }}
                        name="barcode"
                        control="textInput"
                        placeholder={t('prodFieldBarCode')}
                      />
                    </View>
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                      <FormikControl
                        style={{ width: '45%' }}
                        name="weight"
                        control="textInput"
                        placeholder={t('prodFieldWeight')}
                      />
                      {units.length && (
                        <FormikControl
                          style={{ width: '45%' }}
                          name="commercialMeasureUnitId"
                          placeholder={t('prodFieldMeasure')}
                          control="dropdown"
                          items={units}
                        />
                      )}
                    </View>
                    <Typography
                      content={t('description')}
                      style={{ marginTop: 24 }}
                      size={styles.fieldName.fontSize}
                      fontFamily={fonts.baloo2Medium500}
                    />
                    <FormikControl
                      name="description"
                      component={TextInputArea}
                      placeholder={t('prodFieldDesc')}
                    />
                  </View>
                </View>
                <View style={styles.priceStoresContainer}>
                  <FormikControl
                    name="cost"
                    component={PriceStores}
                    title="Precio de costo"
                  />
                  <FormikControl
                    name="sell"
                    component={PriceStores}
                    title="Precio de venta"
                  />
                </View>
                <View style={styles.divider} />
                <View style={styles.sunatOptionContainer}>
                  <View style={styles.headSunatOption}>
                    <FormikControl name="sunatOpt" component={SwitchSunat} />
                    <Typography
                      content={t('prodFieldSunat')}
                      style={{ marginLeft: 8 }}
                      size={styles.sectionName.fontSize}
                      fontFamily={fonts.baloo2Regular400}
                    />
                    <View style={{ marginLeft: 6 }}>
                      <Icon name="helpcenter" color="#573199" />
                    </View>
                  </View>
                  <FormikControl name="sunatOpt" component={ProductSunat} />
                </View>
              </View>
            </Theme.View>
          </ScrollView>
        </BaseForm>
      )}
    </>
  )
}

const rStyles = StyleSheet.create({
  priceStoresContainer: {
    flexDirection: 'column md:row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  priceStore: {
    marginRight: '1 md:20',
    marginTop: 30,
    flex: 1,
    minWidth: '1 md:555'
  },
  fieldsPrice: {
    flex: '0.3 lg:1'
  },
  topSectionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  leftTopContainer: {
    width: '100% md:276',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightTopContainer: { flex: 1, paddingLeft: '1 md:34', minWidth: '1 md:380' },
  priceSection: {
    flexDirection: 'column md:row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  externalContainer: { paddingHorizontal: 20, paddingTop: 16, borderRadius: 10 },
  externalCard: { padding: 16, paddingTop: 24 },
  topOptionsContainer: {
    marginLeft: 4,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textProduct: {
    display: 'none lg:flex'
  },
  textDots: {
    display: 'flex lg:none'
  },
  bigLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'none md:flex'
  },
  mediumLeftContainer: {
    display: 'flex md:none'
  },
  bigRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'none lg:flex'
  },
  mediumRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex lg:none'
  },
  dividerRightContainer: {
    display: 'none sm:flex'
  },
  mainContainer: {
    flex: 1,
    padding: 24,
    flexDirection: 'column'
  },
  fieldName: {
    fontSize: 12
  },
  sectionName: {
    fontSize: 16
  },
  checkLabel: {
    fontSize: 16
  },
  divider: {
    marginTop: 24,
    height: 1,
    width: '100%',
    backgroundColor: colors.grayBorder
  },
  verticalDivider: {
    width: 1,
    height: 48,
    backgroundColor: colors.grayBorder
  },
  sunatOptionContainer: {
    paddingTop: 24
  },
  headSunatOption: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerProdCode: {
    marginTop: 8,
    width: '100% md:30%'
  },
  activeInContainer: {
    width: '100% md:60% lg:50% xl:40%'
  },
  compraVentaChecksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    height: 40
  },
  individualContainer: {
    width: '100% md:45% lg:30%',
    marginTop: 16
  },
  secIndividualContainer: {
    width: '100% sm:45% md:30%',
    marginTop: 16
  },
  typeOperationContainer: {
    width: '100%',
    marginTop: 16
  }
})

export default Products
