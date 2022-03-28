import React, { createContext, useState } from 'react'
import { UserAddressProps } from '../types/Address'
import { UserProfileProps } from '../types/Profile'

export interface ProfileContext {
	userProfile: UserProfileProps
	setUserProfile: (userProfile: UserProfileProps) => void
	handleAddress: (address: UserAddressProps, action: string) => void
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

	return (
		<ProfileContext.Provider
			value={{ userProfile, setUserProfile, handleAddress }}
		>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileProvider
