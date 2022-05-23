import { gql } from '@apollo/client'

const LOGIN = gql`
	mutation Login($data: LoginInput!) {
		login(data: $data) {
			_id
			foreignIds {
				userId
				provider
			}
			firstName
			lastName
			fullName
			email
			phone
			profilePicture
			role
			favoriteProducts
			addresses {
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
			}
			paymentMethods {
				cardName
				cardHolderName
				cardNumber
				expirationDate
				cardBrand
				cvv
			}
		}
	}
`

const REGISTER = gql`
	mutation RegisterUser($data: RegisterInput!) {
		registerUser(data: $data) {
			_id
			foreignIds {
				userId
				provider
			}
			firstName
			lastName
			fullName
			email
			phone
			profilePicture
			role
			favoriteProducts
			addresses {
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
			}
			paymentMethods {
				cardName
				cardHolderName
				cardNumber
				expirationDate
				cardBrand
				cvv
			}
		}
	}
`

const UPDATE = gql`
	mutation updateUser($data: UserUpdateInput!) {
		updateUser(data: $data) {
			_id
			foreignIds {
				userId
				provider
			}
			firstName
			lastName
			fullName
			email
			phone
			profilePicture
			role
			favoriteProducts
			addresses {
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
			}
			paymentMethods {
				cardName
				cardHolderName
				cardNumber
				expirationDate
				cardBrand
				cvv
			}
		}
	}
`

const DELETE_ADDRESS = gql`
	mutation deleteAddress($data: UserUpdateInput!) {
		deleteAddress(data: $data) {
			_id
			foreignIds {
				userId
				provider
			}
			firstName
			lastName
			fullName
			email
			phone
			profilePicture
			role
			favoriteProducts
			addresses {
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
			}
			paymentMethods {
				cardName
				cardHolderName
				cardNumber
				expirationDate
				cardBrand
				cvv
			}
		}
	}
`

const FOREIGN_LOGIN = gql`
	mutation ForeignLogin($data: ForeignLoginInput!) {
		foreignLogin(data: $data) {
			firstName
			lastName
			foreignIds {
				id
				provider
			}
		}
	}
`

export { LOGIN, REGISTER, FOREIGN_LOGIN, UPDATE, DELETE_ADDRESS }
