import React, { createContext, useMemo, useState } from 'react'
import { ProductProps } from '@typings/Product'

interface ProductContextProps {
	products: ProductProps[] | undefined
	setProducts: (product: ProductProps[]) => void
	loading: boolean
	setLoading: (loading: boolean) => void
	loadingMore: boolean
	setLoadingMore: (loading: boolean) => void
}

export const ProductContext = createContext({} as ProductContextProps)

const ProductProvider: React.FC = ({ children }) => {
	const [products, setProducts] = useState<ProductProps[]>()
	const [loading, setLoading] = useState(false)
	const [loadingMore, setLoadingMore] = useState(false)

	const productContext = useMemo(
		() => ({
			products,
			setProducts,
			loading,
			setLoading,
			loadingMore,
			setLoadingMore,
		}),
		[products, loading, loadingMore],
	)

	return (
		<ProductContext.Provider value={productContext}>
			{children}
		</ProductContext.Provider>
	)
}

export default ProductProvider
