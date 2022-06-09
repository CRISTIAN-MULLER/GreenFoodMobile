import React, { createContext, useMemo, useState } from 'react'
import { ProductProps } from '@typings/Product'
import { useQuery } from '@apollo/client'
import GET_ALL_PRODUCTS from '@gql/Product.gql'

interface ProductContextProps {
	handleFetchMore: (distance: number) => void
	nextPage: string
	setNextPage: (nextPage: string) => void
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

	// const [data, setData] = useState()
	const [loadingMore, setLoadingMore] = useState(false)
	const [nextPage, setNextPage] = useState('')

	const { fetchMore } = useQuery(GET_ALL_PRODUCTS, {
		variables: {
			data: {
				limit: 6,
				sortAscending: true,
				sortField: 'name',
			},
			filter: {
				status: 'ativo',
			},
		},
	})

	async function handleFetchMore(distance: number) {
		if (distance < 1) return

		if (nextPage) {
			setLoadingMore(true)
			const {
				data: {
					getAllProducts: { products: refetchedProducts, next },
				},
			} = await fetchMore({
				variables: {
					data: {
						limit: 6,
						sortAscending: true,
						sortField: 'name',
						nextPage,
					},
					filter: {
						status: 'ativo',
					},
				},
			})
			setNextPage(next)
			const newProducts = [...products!, ...refetchedProducts]
			setProducts(newProducts)
			setLoadingMore(false)
		}
	}

	const productContext = useMemo(
		() => ({
			handleFetchMore,
			products,
			setProducts,
			loading,
			nextPage,
			setLoading,
			setNextPage,
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
