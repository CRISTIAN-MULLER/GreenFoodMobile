import { UserAddressProps } from './Address'

export type RootStackParamList = {
  Welcome: undefined
  Login: undefined
  User: undefined
  Menu: undefined
  Cart: undefined
  Address: {
    address: UserAddressProps,
    action: string,
    refresh?: boolean,
    setRefresh?: (refresh: boolean) => void
  }
  Payment: undefined
  AddressSelection: undefined
}
