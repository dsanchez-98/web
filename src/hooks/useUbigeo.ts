import { useLocationService } from 'services/bm'
import useMutableState from 'hooks/core/useMutableState'
const items: { label: string; value: number }[] = []
const initialValue = {
  country: items,
  department: items,
  province: items,
  district: items,
  current: {
    countryId: 0,
    departmentId: 0,
    provinceId: 0,
    districtId: 0
  }
}

export const getLocation = (location: any = {}) => {
  if (!location) {
    return undefined
  }
  const { parent: parentDistrict = {}, ...district } = location
  const { parent: parentProvince = {}, ...province } = parentDistrict
  const { parent: parentCountry = {}, ...department } = parentProvince
  const { ...country } = parentCountry
  return {
    department: { label: department.name, value: department.id },
    province: { label: province.name, value: province.id },
    district: { label: district.name, value: district.id },
    country: { label: country.name, value: country.id }
  }
}

const useUbigeo = (initial = initialValue) => {
  const state = useMutableState(Object.assign({}, initialValue, initial))
  const { getLocations } = useLocationService()

  const onChange = (key: keyof typeof initialValue, value: typeof items) => {
    state.value = {
      ...state.value,
      [key]: value
    }
  }

  const setCurrent = (key: keyof typeof initialValue, value: number) => {
    state.value = {
      ...state.value,
      current: { ...state.value.current, [`${key}Id`]: value }
    }
  }

  const getCountry = async () => {
    try {
      // TODO: Actualizar con los paises
      const response = await getLocations()
      onChange(
        'country',
        response.data.items.map((i) => ({ label: i.name, value: i.id }))
      )
    } catch (error) {}
  }

  const getDepartment = async (parentId: number) => {
    try {
      const response = await getLocations({ parentId, size: 24 })
      onChange(
        'department',
        response.data.items.map((i) => ({ label: i.name, value: i.id }))
      )
    } catch (error) {}
  }

  const getProvince = async (parentId: number) => {
    try {
      const response = await getLocations({ parentId, size: 1000 })
      onChange(
        'province',
        response.data.items.map((i) => ({ label: i.name, value: i.id }))
      )
    } catch (error) {}
  }

  const getDistrict = async (parentId: number) => {
    try {
      const response = await getLocations({ parentId, size: 1000 })
      onChange(
        'district',
        response.data.items.map((i) => ({ label: i.name, value: i.id }))
      )
    } catch (error) {}
  }

  return {
    getCountry,
    getDepartment,
    getProvince,
    getDistrict,
    state: state.value,
    setCurrent
  }
}

export default useUbigeo
