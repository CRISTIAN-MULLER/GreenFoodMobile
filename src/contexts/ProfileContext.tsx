import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useMemo,
	useState,
} from 'react'
import { UserAddressProps } from '@typings/Address'
import { UserPaymentMethodProps } from '@typings/PaymentMethod'
import { UserProfileProps } from '@typings/Profile'

export interface ProfileContextProps {
	userProfile: UserProfileProps
	setUserProfile: Dispatch<SetStateAction<UserProfileProps>>
	handleAddress: (address: UserAddressProps, action: string) => void
	handlePaymentMethod: (
		paymentMethod: UserPaymentMethodProps,
		action: string,
	) => void
}

export const ProfileContext = createContext({} as ProfileContextProps)

const ProfileProvider: React.FC = ({ children }) => {
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
		addresses: [
			{
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
					coordinates: [0, 0],
				},
			},
		],
		paymentMethods: [
			{
				cardNumber: 'string',
				cardName: 'string',
				cardHolderName: 'string',
				expirationDate: 'string',
				cardBrand: 'string',
				cvv: 'string',
			},
		],
	})

	function handleAddress(updateAddress: UserAddressProps, action: string) {
		const profile = userProfile

		if (action === 'delete') {
			const profileAddresses = userProfile.addresses!.filter(
				(address) => address.name !== updateAddress.name,
			)
			profile.addresses = [...profileAddresses]
			setUserProfile(profile)
			return
		}
		if (action === 'update') {
			const profileAddresses = userProfile.addresses!.map((address) => {
				if (address.name === updateAddress.name) {
					address.name = updateAddress.name
					address.zipcode = updateAddress.zipcode
					address.street = updateAddress.street
					address.houseNumber = updateAddress.houseNumber
					address.district = updateAddress.district
					address.city = updateAddress.city
					address.state = updateAddress.state
					address.reference = updateAddress.reference
					address.location = updateAddress.location
				}
				return address
			})

			profile.addresses = [...profileAddresses]
			setUserProfile(profile)
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

	function handlePaymentMethod(
		updatePaymentMethod: UserPaymentMethodProps,
		action: string,
	) {
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

	const profileContext = useMemo(
		() => ({
			userProfile,
			setUserProfile,
			handleAddress,
			handlePaymentMethod,
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
