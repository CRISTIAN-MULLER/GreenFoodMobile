import { Dispatch, SetStateAction } from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

export type UserAddressProps = {
	name: string
	zipcode: string
	street: string
	houseNumber: string
	district: string
	city: string
	state: string
	reference: string
	location: {
		type: string
		coordinates: [number, number]
	}
}

export interface AddressHandleProps extends RectButtonProps {
	data: UserAddressProps
	isSelected: boolean
	refresh: boolean
	setRefresh: Dispatch<SetStateAction<boolean>>
}
