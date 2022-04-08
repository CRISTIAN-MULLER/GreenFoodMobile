import { RectButtonProps } from 'react-native-gesture-handler'

export type UserPaymentMethodProps = {
  cardNumber: string
  cardName: string
  cardHolderName: string
  expirationDate: string
  cardBrand: string
  cvv: string
}

export interface PaymentMethodHandleProps extends RectButtonProps {
  data: UserPaymentMethodProps
  isSelected: boolean
  refresh: boolean
  setRefresh: (refresh: boolean) => void
}