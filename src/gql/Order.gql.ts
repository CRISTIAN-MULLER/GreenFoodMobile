import { gql } from '@apollo/client'

const GET_ALL_ORDERS = gql`
	query GetAllOrders($data: PaginationInput!, $filter: OrderFilter) {
		getAllOrders(data: $data, filter: $filter) {
			orders {
				_id
				createdAt
				updatedAt
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
						coordinates {
							latitude
							longitude
							latitudeDelta
							longitudeDelta
						}
					}
					isFavorite
				}
				payment {
					paymentMethod {
						app {
							cardNumber
							cardName
							cardHolderName
							expirationDate
							cardBrand
							cvv
							isFavorite
						}
						delivery {
							card {
								cardBrand
								type
							}
							cash {
								change
							}
						}
					}
					paymentStatus
					totalPrice
				}
				origin
				status
				step
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
			createdAt
			updatedAt
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
					coordinates {
						latitude
						longitude
						latitudeDelta
						longitudeDelta
					}
				}
				isFavorite
			}
			payment {
				paymentMethod {
					app {
						cardNumber
						cardName
						cardHolderName
						expirationDate
						cardBrand
						cvv
						isFavorite
					}
					delivery {
						card {
							cardBrand
							type
						}
						cash {
							change
						}
					}
				}
				paymentStatus
				totalPrice
			}
			origin
			status
			step
			observation
		}
	}
`

export { GET_ALL_ORDERS, CREATE_ORDER }
