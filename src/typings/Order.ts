import { UserAddressProps } from './Address'
import { CartProps } from './Cart'
import { PaymentProps } from './Payment'
import { UserProfileProps } from './Profile'

export type OrderProps = {
  cart: CartProps
  userId: UserProfileProps["_id"]
  payment: PaymentProps
  deliveryAddress: UserAddressProps
}