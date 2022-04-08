import { UserAddressProps } from './Address'
import { UserPaymentMethodProps } from './PaymentMethod'

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
  AddressSelection: undefined
  PaymentSelection: undefined
  CreditCard: {
    paymentMethod: UserPaymentMethodProps,
    action: string,
    refresh?: boolean,
    setRefresh?: (refresh: boolean) => void
  }
}
