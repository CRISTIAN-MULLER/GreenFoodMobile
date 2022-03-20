export type SaleUnitProps = {
  _id: string
  saleUnit: string
  price: number
  active: boolean
  description: string
  isDefault: boolean
}

export type CartProductProps = {
  _id: string
  name: string
  image: string
  saleUnit: SaleUnitProps
  itemTotalQty: number
  itemTotalPrice: number
}


export type ProductProps = {
  _id: string
  name: string
  image: string
  saleUnits: [
    {
      _id: string
      active: boolean
      saleUnit: string
      price: number
      description: string
      isDefault: boolean
    },
  ]
  category: string
  active: boolean
}

export interface ProductHandleProps {
  data: ProductProps
  showModalAddToCart: boolean
  setShowModalAddToCart: (showModalAddToCart: boolean) => void
}

export interface CartProductHandleProps {
  data: CartProductProps
}