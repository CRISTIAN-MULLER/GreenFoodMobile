import { gql } from '@apollo/client'

const HELLO = gql`
	query Query {
		hello
	}
`

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
					coordinates
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
					coordinates
				}
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

export { LOGIN, HELLO, REGISTER, FOREIGN_LOGIN }
