import { CartProductProps } from './Product'

export type CartItemsProps = {
  items: CartProductProps[]
  itemsTotalQty: number
  itemsTotalPrice: number
}