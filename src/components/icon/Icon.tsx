import React, { FunctionComponent as FC } from 'react'
import * as Icons from './icons'
import { SvgProps } from 'react-native-svg'

const icons = {
  alert: Icons.Alert,
  arrowDown: Icons.ArrowDown,
  arrowRight: Icons.ArrowRight,
  calendar: Icons.Calendar,
  camera: Icons.Camera,
  check: Icons.Check,
  circle: Icons.Circle,
  circleOutline: Icons.CircleOutline,
  clients: Icons.Clients,
  edit: Icons.Edit,
  equis: Icons.Equis,
  error: Icons.Error,
  add: Icons.Add,
  arrowUp: Icons.ArrowUp,
  close: Icons.Close,
  delete: Icons.Delete,
  devices: Icons.Devices,
  devicesOutline: Icons.DevicesOutline,
  editOutlined: Icons.EditOutlined,
  eye: Icons.Eye,
  eyeBlocked: Icons.EyeBlocked,
  eyeInvisible: Icons.EyeInvisible,
  facebook: Icons.Facebook,
  google: Icons.Google,
  hand: Icons.Hand,
  hearth: Icons.Hearth,
  helpcenter: Icons.Helpcenter,
  logoTumiSoft: Icons.LogoTumiSoft,
  pass: Icons.Pass,
  password: Icons.Password,
  peru: Icons.Peru,
  preview: Icons.Preview,
  print: Icons.Print,
  products: Icons.Products,
  purchases: Icons.Purchases,
  pushPin: Icons.PushPin,
  user: Icons.User,
  remove: Icons.Remove,
  reports: Icons.Reports,
  rocket: Icons.Rocket,
  rotate: Icons.Rotate,
  sales: Icons.Sales,
  search: Icons.Search,
  star: Icons.Star,
  starOutlined: Icons.StarOutlined,
  config: Icons.Config,
  pdf: Icons.PDF,
  mail: Icons.Mail,
  menuSlide: Icons.MenuSlide,
  options: Icons.Options,
  ce: Icons.CE,
  sunatResend: Icons.SunatResend,
  whatsApp: Icons.WhatsApp,
  canceled: Icons.Canceled,
  filter: Icons.Filter,
  listView: Icons.ListView,
  gridView: Icons.GridView,
  incognito: Icons.Incognito,
  inventory: Icons.Inventory,
  inventoryOutline: Icons.InventoryOutline,
  barcode: Icons.Barcode,
  menu: Icons.Menu,
  iconTumiSoft: Icons.IconTumiSoft,
  iconTumiSoftPlaceholder: Icons.IconTumiSoftPlaceholder
}

export type IconNames = keyof typeof icons
export interface IconProps extends SvgProps {
  name: IconNames
}

const Icon: FC<IconProps> = (props) => {
  const IconComponent = icons[props.name] as any
  if (IconComponent) {
    return <IconComponent {...props} tabIndex="-1" />
  }
  return null
}

export default Icon
