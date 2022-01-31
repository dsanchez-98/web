import Account from './Account'
import CloseSesion from './CloseSesion'
import Config from './Config'
import Enterprise from './Enterprise'
import Payment from './Payment'
import Politics from './Politics'
import Tutorial from './Tutorial'

const icons = {
  account: Account,
  closeSesion: CloseSesion,
  config: Config,
  enterprise: Enterprise,
  payment: Payment,
  politics: Politics,
  tutorial: Tutorial
}
export type IconNames = keyof typeof icons
export default icons
