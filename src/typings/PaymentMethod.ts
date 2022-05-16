import { Dispatch, SetStateAction } from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

export interface CardProps {
	cardNumber: string
	cardName: string
	cardHolderName: string
	expirationDate: string
	cardBrand: string
	cvv: string
}

export type UserPaymentMethodProps = {
	cardNumber: string
	cardName: string
	cardHolderName: string
	expirationDate: string
	cardBrand: string
	cvv: string
}

export interface PaymentMethodHandleProps extends RectButtonProps {
	data: UserPaymentMethodProps
	isSelected: boolean
	refresh: boolean
	setRefresh: Dispatch<SetStateAction<boolean>>
}
