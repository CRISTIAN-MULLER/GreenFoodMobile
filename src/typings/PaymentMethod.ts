import { Dispatch, SetStateAction } from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

export interface CardProps {
	cardNumber: string
	cardName: string
	cardHolderName: string
	expirationDate: string
	cardBrand: string
	cvv: string
	isFavorite: boolean
}

export type UserPaymentMethodProps = {
	app?: {
		cardNumber: string
		cardName: string
		cardHolderName: string
		expirationDate: string
		cardBrand: string
		cvv: string
		isFavorite: boolean
	}
	delivery?: {
		card?: {
			cardBrand: string
			type: string
		}
		cash?: {
			change: string
		}
	}
}

export interface PaymentMethodHandleProps extends RectButtonProps {
	data: CardProps
	isSelected: boolean
	refresh: boolean
	handleSelectedPaymentMethod: (arg0: CardProps) => void
	setRefresh: Dispatch<SetStateAction<boolean>>
}
