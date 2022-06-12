import { Dispatch, SetStateAction } from 'react'

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
	categories: [string]
	active: boolean
}

export interface PrimaryProductHandleProps {
	data: ProductProps
}

export interface ProductHandleProps {
	data: ProductProps
	showModalAddToCart: boolean
	setShowModalAddToCart: Dispatch<SetStateAction<boolean>>
}

export interface ProductSearchProps {
	setSearchText: Dispatch<SetStateAction<string>>
	searchText: string
	handleSearchProduct: () => void
}

export interface CartProductHandleProps {
	data: CartProductProps
}
