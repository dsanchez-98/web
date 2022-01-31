import React, { FC, useState } from 'react'
import { useResponsiveStyles, StyleSheet } from 'components/responsiveLayout'
import Card from 'components/card'
import Typography from 'components/typography'
import { TouchableOpacity, View } from 'react-native'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import Icon from 'components/icon'
import colors from 'styles/colors'
import Checkbox from 'components/checkbox'
import useTranslation from 'hooks/useTranslation'
import Button from 'components/button'

interface RolRow {
  id: number
  label: string
  options: string[]
}

interface ModalRolsProps {
  hideModal: () => void
  params: {
    title: string
    // arrRow: RolRow[]
    // rolsHandleChange: (rol: RolRow[]) => void
  }
}

interface RowComponentProps {
  rowValue: RolRow
  rowHandleChange: (opt: RolRow) => void
}

const ModalRols: FC<ModalRolsProps> = (props) => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  const [arrRow, setArrRow] = useState<RolRow[]>([
    {
      id: 1,
      label: 'Crea empresa - configurar la empresa',
      options: []
    },
    {
      id: 2,
      label: 'Crea Tiendas / Caja',
      options: []
    },
    {
      id: 3,
      label: 'Configuración tienda (usuario - series - tipos de pago)',
      options: []
    },
    {
      id: 4,
      label: 'Creación de usuarios (invitación y llenado de datos)',
      options: []
    },
    {
      id: 5,
      label: 'Módulos',
      options: []
    },
    {
      id: 6,
      label: 'Reportes Sunat',
      options: []
    },
    {
      id: 7,
      label: 'Cambio de logos',
      options: []
    }
  ])
  const arrColumns = [
    { label: t('userRolRead'), value: '1' },
    { label: t('userRolCreate'), value: '2' },
    { label: t('userRolEdit'), value: '3' },
    { label: t('userRolDelete'), value: '4' }
  ]

  const RowComponent = (props: RowComponentProps) => {
    const { styles } = useResponsiveStyles(rStyles)

    return (
      <View style={styles.tableRow}>
        <View style={styles.rowContainer}>
          <View style={styles.firstColumn}>
            <Typography
              content={props.rowValue.id.toString()}
              fontFamily={fonts.baloo2Regular400}
              size={fontSize.xs}
            />
          </View>
          <View style={styles.secondColumn}>
            <Typography
              content={props.rowValue.label}
              fontFamily={fonts.baloo2Regular400}
              size={fontSize.xs}
            />
          </View>
          {arrColumns.map((y, i) => (
            <View key={i} style={styles.standarColumn}>
              <Checkbox
                onChange={() => {
                  props.rowHandleChange({
                    ...props.rowValue,
                    options: props.rowValue.options.some((z) => z === y.value)
                      ? props.rowValue.options.filter((w) => w !== y.value)
                      : [...new Set([...props.rowValue.options, y.value])]
                  })
                }}
                type="primary"
                value={props.rowValue.options.some((z) => z === y.value)}
              />
            </View>
          ))}
        </View>
        <View style={styles.divider} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.cardContainer}>
          <View style={styles.headerContainer}>
            <Typography
              style={{
                marginLeft: 24
              }}
              content={`${t('userRoleOf')} ${props.params.title}`}
              fontFamily={fonts.baloo2SemiBold600}
              size={fontSize.lg}
            />
            <TouchableOpacity
              style={styles.closeContainer}
              onPress={() => props.hideModal()}
            >
              <Icon name="close" width={16} height={16} color="#2A2D45" />
            </TouchableOpacity>
          </View>
          <Typography
            style={{ marginTop: 16, marginBottom: 24, marginLeft: 24 }}
            content={t('userRolsChoose')}
            fontFamily={fonts.baloo2Regular400}
            size={fontSize.md}
          />
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.divider} />
              <View style={styles.rowContainer}>
                <View style={styles.firstColumn}>
                  <Typography
                    content="#"
                    fontFamily={fonts.baloo2SemiBold600}
                    size={fontSize.sm}
                  />
                </View>
                <View style={styles.secondColumn}>
                  <Typography
                    content={props.params.title}
                    fontFamily={fonts.baloo2SemiBold600}
                    size={fontSize.sm}
                  />
                </View>
                {arrColumns.map((x, k) => (
                  <View key={k} style={styles.standarColumn}>
                    <Checkbox
                      onChange={(val) => {
                        setArrRow(
                          val
                            ? arrRow.map((y) => {
                                return {
                                  ...y,
                                  options: [...y.options, x.value]
                                }
                              })
                            : arrRow.map((y) => {
                                return {
                                  ...y,
                                  options: y.options.filter((z) => z !== x.value)
                                }
                              })
                        )
                      }}
                      type="primary"
                      value={arrRow.every((y) => y.options.some((z) => z === x.value))}
                    />
                    <Typography
                      style={{
                        marginLeft: 10
                      }}
                      content={x.label}
                      fontFamily={fonts.baloo2SemiBold600}
                      size={fontSize.sm}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.divider} />
            </View>
            {arrRow.map((x, k) => (
              <RowComponent
                key={k}
                rowValue={x}
                rowHandleChange={(newRow) => {
                  setArrRow(
                    [...arrRow.filter((y) => y.id !== x.id), newRow].sort(
                      (a, b) => a.id - b.id
                    )
                  )
                }}
              />
            ))}
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24 }}
          >
            <Button
              style={{
                width: 'auto',
                paddingHorizontal: 10,
                paddingVertical: 4,
                marginRight: 10
              }}
              type="primary"
              title={t('update')}
            />
            <Button
              onPress={() => props.hideModal()}
              style={{
                width: 'auto',
                paddingHorizontal: 10,
                paddingVertical: 4,
                marginRight: 10
              }}
              type="secondaryBlue"
              title={t('cancel')}
            />
          </View>
        </View>
      </Card>
    </View>
  )
}

const rStyles = StyleSheet.create({
  container: {},
  cardContainer: {
    paddingTop: 16,
    paddingBottom: 24
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  closeContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.disabled,
    borderRadius: 200,
    marginRight: 16
  },
  tableContainer: {},
  tableHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#F6F7FB'
  },
  tableRow: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.gray
  },
  rowContainer: {
    flexDirection: 'row'
  },
  firstColumn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    // width: 49,
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondColumn: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    // width: 309,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  standarColumn: {
    flexDirection: 'row',
    paddingVertical: 8,
    width: 132,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ModalRols
