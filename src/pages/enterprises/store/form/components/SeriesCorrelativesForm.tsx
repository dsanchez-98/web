/* eslint-disable indent */
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import { View } from 'react-native'
import React, { FunctionComponent as FC, useRef } from 'react'
import Typography from 'components/typography'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import fonts from 'styles/fonts'
import Switch from 'components/switch'
import useTranslation from 'hooks/useTranslation'
import FormikControl from 'components/formikControl'

type Serie = {
  active: boolean
  standardTaxDocumentId: number
  series: string
  correlativeInitial: number
}

type SeriesCorrelativesFormProps = {
  name: string
  value?: {
    flagHadSeries: boolean
    printedTicketMessage: string
    series: Serie[]
  }
  onChange: (val: {
    flagHadSeries: boolean
    printedTicketMessage: string
    series: Serie[]
  }) => void
}

const Series: FC<any> = ({ value, disabled, name }) => {
  return (
    <>
      {value?.map((x: any, k: number) => (
        <View key={k.toString()} style={{ flexDirection: 'row', marginVertical: 4 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              alignSelf: 'center'
            }}
          >
            <FormikControl
              name={`${name}[${k}].active`}
              control="switch"
              dependencies={[disabled]}
              disabled={disabled}
            />
            <Typography
              content={x.name}
              style={{ flex: 1, marginHorizontal: 5 }}
              numberOfLines={1}
            />
          </View>
          <FormikControl name={`${name}[${k}].active`}>
            {({ value }) => {
              return (
                <View style={{ flexDirection: 'row' }}>
                  <FormikControl
                    name={`${name}[${k}].series`}
                    control="textInput"
                    style={{ width: 80, marginHorizontal: 5 }}
                    dependencies={[value]}
                    disabled={!value}
                  />
                  <FormikControl
                    name={`${name}[${k}].correlativeInitial`}
                    control="textInput"
                    style={{ width: 80, marginHorizontal: 5 }}
                    keyboardType="number-pad"
                    dependencies={[value]}
                    disabled={!value}
                  />
                </View>
              )
            }}
          </FormikControl>
        </View>
      ))}
    </>
  )
}

const SeriesCorrelativesForm: FC<SeriesCorrelativesFormProps> = (props) => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  const tempSeries = useRef(props.value?.series || [])
  const tempSeriesEdited = useRef<Serie[]>(props.value?.series || [])

  const changeHadSeries = (value: boolean) => {
    props.onChange({
      ...props.value!,
      flagHadSeries: value,
      series: value
        ? tempSeriesEdited.current
        : tempSeries.current.map((item) => {
            return { ...item, active: value }
          })
    })
    tempSeriesEdited.current = props.value?.series!
  }

  return (
    <View>
      <View style={styles.containerTopSwitch}>
        <Switch value={!!props.value?.flagHadSeries} onChange={changeHadSeries} />
        <Typography content={t('storeSeCoAlready')} style={{ marginLeft: 16, flex: 1 }} />
      </View>
      <View style={styles.divider} />
      <View style={styles.textSeriesHolder}>
        <Typography
          content={t('storeSeries')}
          color={colors.black}
          size={fontSize.xs}
          fontFamily={fonts.baloo2Regular400}
          style={{ marginRight: 32 }}
          disableThemeColor
        />
        <Typography
          content={t('storeCorrelatives')}
          color={colors.black}
          size={fontSize.xs}
          fontFamily={fonts.baloo2Regular400}
          style={{ marginRight: 21 }}
          disableThemeColor
        />
      </View>
      <FormikControl
        name={`${props.name}.series`}
        component={Series}
        disabled={!props.value?.flagHadSeries}
        dependencies={[props.value?.flagHadSeries]}
      />
    </View>
  )
}

const rStyles = StyleSheet.create({
  seriesTextInput: { width: '64 lg:60', marginRight: 10 },
  correlativesTextInput: { width: '125 lg:88' },
  seriesLongText: {
    fontSize: `${fontSize.sm} md:${fontSize.xs} lg:${fontSize.md}`
  },
  itemSeriesText: {
    fontSize: `${fontSize.sm} lg:${fontSize.md}`
  },
  textSeriesHolder: {
    display: 'none lg:flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16
  },
  divider: {
    backgroundColor: '#CCCCCC',
    width: '100%',
    height: 1
  },
  itemSeriesContainer: {
    flexDirection: 'column lg:row',
    justifyContent: 'space-between',
    alignItems: 'flex-start lg:center',
    marginTop: '8 lg:1'
  },
  containerTopSwitch: {
    marginBottom: 12,
    flexDirection: 'row'
  }
})

export default SeriesCorrelativesForm
