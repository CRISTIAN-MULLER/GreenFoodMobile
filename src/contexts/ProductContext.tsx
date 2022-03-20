import { useLazyQuery, useQuery } from '@apollo/client'
import React, { createContext, useEffect, useState } from 'react'
import { Load } from '../components/Load'
import { GET_ALL_PRODUCTS } from '../gql/Product.gql'
import { ProductProps, SaleUnitProps } from '../types/Product'

interface ProductContext {
	products: [ProductProps] | undefined
	setProducts: (product: [ProductProps]) => void
	loading: boolean
	setLoading: (loading: boolean) => void
	loadingMore: boolean
	setLoadingMore: (loading: boolean) => void
}

export const ProductContext = createContext({} as ProductContext)

const ProductProvider: React.FC = ({ children }) => {
	const [products, setProducts] = useState<[ProductProps]>()
	const [loading, setLoading] = useState(false)
	const [loadingMore, setLoadingMore] = useState(false)

	return (
		<ProductContext.Provider
			value={{
				products,
				setProducts,
				loading,
				setLoading,
				loadingMore,
				setLoadingMore,
			}}
		>
			{children}
		</ProductContext.Provider>
	)
}

export default ProductProvider
