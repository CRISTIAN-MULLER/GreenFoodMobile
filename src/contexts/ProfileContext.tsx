import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useMemo,
	useState,
} from 'react'
import { UserAddressProps } from '@typings/Address'
import { CardProps } from '@typings/PaymentMethod'
import { UserProfileProps } from '@typings/Profile'
import { useMutation } from '@apollo/client'
import { UPDATE, DELETE_ADDRESS } from '@gql/User.gql'

export interface ProfileContextProps {
	newAddress: UserAddressProps
	setNewAddress: (address: UserAddressProps) => void
	userProfile: UserProfileProps
	setUserProfile: Dispatch<SetStateAction<UserProfileProps>>
	handleAddress: (address: UserAddressProps, action: string) => void
	handlePaymentMethod: (paymentMethod: CardProps, action: string) => void
	handleFavorite: (favoriteProductId: string) => void
}

export const ProfileContext = createContext({} as ProfileContextProps)

const ProfileProvider: React.FC = ({ children }) => {
	const [UpdateUser] = useMutation(UPDATE)
	const [DeleteAddress] = useMutation(DELETE_ADDRESS)

	const [newAddress, setNewAddress] = useState<UserAddressProps>({
		name: 'string',
		zipcode: 'string',
		street: 'string',
		houseNumber: 'string',
		district: 'string',
		city: 'string',
		state: 'string',
		reference: 'string',
		location: {
			type: 'string',
			coordinates: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0,
				longitudeDelta: 0,
			},
		},
		isFavorite: false,
	})

	const [userProfile, setUserProfile] = useState<UserProfileProps>({
		_id: '',
		firstName: 'string',
		lastName: 'string',
		fullName: 'string',
		email: 'string',
		password: 'string',
		phone: 'string',
		profilePicture: 'string',
		role: 'string',
		addresses: [newAddress],
		favoriteProducts: [],
		paymentMethods: [
			{
				cardNumber: 'string',
				cardName: 'string',
				cardHolderName: 'string',
				expirationDate: 'string',
				cardBrand: 'string',
				cvv: 'string',
				isFavorite: false,
			},
		],
	})

	const updateUser = async (properties: any[]) => {
		const updateData = Object.fromEntries(properties)

		const {
			data: { updateUser: user },
		} = await UpdateUser({
			variables: {
				data: {
					UserId: userProfile._id,
					...updateData,
				},
			},
		})
		setUserProfile(user)
	}

	const handleAddress = async (
		updateAddress: UserAddressProps,
		action: string,
	) => {
		const profile = userProfile
		if (action === 'delete') {
			const {
				data: { deleteAddress: user },
			} = await DeleteAddress({
				variables: {
					data: {
						UserId: userProfile._id,
						address: {
							name: updateAddress.name,
						},
					},
				},
			})
			setUserProfile(user)
			return
		}

		if (action === 'update') {
			const {
				data: { updateUser: user },
			} = await UpdateUser({
				variables: {
					data: {
						UserId: userProfile._id,
						address: updateAddress,
					},
				},
			})
			setUserProfile(user)
			return
		}

		if (action === 'add') {
			if (profile.addresses) {
				profile.addresses.push(updateAddress)
				setUserProfile(profile)
				return
			}
			profile.addresses = [updateAddress]
		}
	}

	function handlePaymentMethod(updatePaymentMethod: CardProps, action: string) {
		const profile = userProfile

		if (action === 'delete') {
			const profilePaymentMethods = userProfile.paymentMethods!.filter(
				(paymentMethod) =>
					paymentMethod.cardName !== updatePaymentMethod.cardName,
			)
			profile.paymentMethods = [...profilePaymentMethods]
			setUserProfile(profile)
			return
		}
		if (action === 'update') {
			const profilePaymentMethods = userProfile.paymentMethods!.map(
				(paymentMethod) => {
					if (paymentMethod.cardName === updatePaymentMethod.cardName) {
						paymentMethod.cardNumber = updatePaymentMethod.cardNumber
						paymentMethod.cardName = updatePaymentMethod.cardName
						paymentMethod.cardHolderName = updatePaymentMethod.cardHolderName
						paymentMethod.expirationDate = updatePaymentMethod.expirationDate
						paymentMethod.cardBrand = updatePaymentMethod.cardBrand
						paymentMethod.cvv = updatePaymentMethod.cvv
						paymentMethod.isFavorite = updatePaymentMethod.isFavorite
					}
					return paymentMethod
				},
			)

			profile.paymentMethods = [...profilePaymentMethods]
			setUserProfile(profile)
			return
		}

		if (action === 'add') {
			if (profile.paymentMethods) {
				profile.paymentMethods.push(updatePaymentMethod)
				setUserProfile(profile)
				return
			}
			profile.paymentMethods = [updatePaymentMethod]
		}
	}

	const handleFavorite = async (favoriteProductId: string) => {
		const favoriteProducts: string[] = []
		userProfile.favoriteProducts?.forEach((id) => {
			if (id !== favoriteProductId) {
				favoriteProducts.push(id)
			}
		})
		if (favoriteProducts?.length === userProfile.favoriteProducts?.length) {
			favoriteProducts.push(favoriteProductId)
		}
		updateUser([['favoriteProducts', favoriteProducts]])
	}

	const profileContext = useMemo(
		() => ({
			newAddress,
			setNewAddress,
			userProfile,
			setUserProfile,
			handleAddress,
			handlePaymentMethod,
			handleFavorite,
		}),
		[userProfile],
	)

	return (
		<ProfileContext.Provider value={profileContext}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileProvider
