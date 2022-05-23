import { gql } from '@apollo/client'

const GET_ALL_PRODUCTS = gql`
	query GetAllProducts($data: PaginationInput!, $filter: ProductFilter) {
		getAllProducts(data: $data, filter: $filter) {
			products {
				_id
				name
				description
				image
				saleUnits {
					_id
					saleUnit
					description
					price
					active
					isDefault
				}
				categories
				status
			}
			next
		}
	}
`

export default GET_ALL_PRODUCTS
