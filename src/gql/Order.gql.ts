import { gql } from '@apollo/client'

const GET_ALL_ORDERS = gql`
	query GetAllOrders($data: PaginationInput!) {
		getAllOrders(data: $data) {
			orders {
				_id
				customerId
				items {
					productId
					name
					image
					saleUnit {
						_id
						saleUnit
						description
						price
						active
						isDefault
					}
					itemTotalQty
					itemTotalPrice
				}
				phone
				deliveryAddress {
					name
					zipcode
					street
					houseNumber
					district
					city
					state
					reference
					location {
						type
						coordinates
					}
					isFavorite
				}
				payment {
					paymentMethod
					paymentStatus
					cardBrand
					change
				}
				origin
				status
				observation
			}
			next
		}
	}
`
const CREATE_ORDER = gql`
	mutation CreateOrder($data: OrderInput!) {
		createOrder(data: $data) {
			_id
			orderNumber
			customerId
			items {
				productId
				name
				image
				saleUnit {
					_id
					saleUnit
					description
					price
					active
					isDefault
				}
				itemTotalQty
				itemTotalPrice
			}
			phone
			deliveryAddress {
				name
				zipcode
				street
				houseNumber
				district
				city
				state
				reference
				location {
					type
					coordinates
				}
				isFavorite
			}
			payment {
				paymentMethod
				paymentStatus
				cardBrand
				change
			}
			origin
			status
			step
			observation
		}
	}
`

export { GET_ALL_ORDERS, CREATE_ORDER }
