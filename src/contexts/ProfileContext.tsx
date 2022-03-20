import React, { createContext, useState } from 'react'
import { UserProfileProps } from '../types/Profile'

export interface ProfileContext {
	userProfile: UserProfileProps
	setUserProfile?: (userProfile: UserProfileProps) => void
}

export const ProfileContext = createContext({} as ProfileContext)

const ProfileProvider: React.FC = ({ children }) => {
	const [userProfile, setUserProfile] = useState<UserProfileProps>({
		firstName: 'string',
		lastName: 'string',
		fullName: 'string',
		email: 'string',
		password: 'string',
		phone: 'string',
		profile_picture: 'string',
		role: 'string',
		address: {
			zipcode: 'string',
			street: 'string',
			houseNumber: 'string',
			district: 'string',
			city: 'string',
			state: 'string',
			reference: 'string',
		},
	})

	return (
		<ProfileContext.Provider value={{ userProfile, setUserProfile }}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileProvider
