import React, { createContext, useState } from 'react'
import { UserAddressProps } from '../types/Address'
import { UserPaymentMethodProps } from '../types/PaymentMethod'
import { UserProfileProps } from '../types/Profile'

export interface ProfileContext {
	userProfile: UserProfileProps
	setUserProfile: (userProfile: UserProfileProps) => void
	handleAddress: (address: UserAddressProps, action: string) => void
	handlePaymentMethod: (
		paymentMethod: UserPaymentMethodProps,
		action: string,
	) => void
}

export const ProfileContext = createContext({} as ProfileContext)

const ProfileProvider: React.FC = ({ children }) => {
	const [userProfile, setUserProfile] = useState<UserProfileProps>({
		_id: '',
		firstName: 'string',
		lastName: 'string',
		fullName: 'string',
		email: 'string',
		password: 'string',
		phone: 'string',
		profile_picture: 'string',
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
					address = updateAddress
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
						paymentMethod = updatePaymentMethod
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

	return (
		<ProfileContext.Provider
			value={{
				userProfile,
				setUserProfile,
				handleAddress,
				handlePaymentMethod,
			}}
		>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileProvider
