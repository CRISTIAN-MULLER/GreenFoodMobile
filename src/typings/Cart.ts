import { CartProductProps } from './Product'

export type CartProps = {
  items: CartProductProps[]
  itemsTotalQty: number
  itemsTotalPrice: number
}