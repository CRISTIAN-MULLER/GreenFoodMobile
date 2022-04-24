import { Dispatch, SetStateAction } from 'react'
import { UserAddressProps } from './Address'
import { UserPaymentMethodProps } from './PaymentMethod'

type RootStackParamList = {
	Welcome: undefined
	Login: undefined
	User: undefined
	Menu: undefined
	Cart: undefined
	Address: {
		address: UserAddressProps
		action: string
		refresh?: boolean
		setRefresh?: Dispatch<SetStateAction<boolean>>
	}
	AddressSelection: undefined
	PaymentSelection: undefined
	CreditCard: {
		paymentMethod: UserPaymentMethodProps
		action: string
		refresh?: boolean
		setRefresh?: Dispatch<SetStateAction<boolean>>
	}
}

export default RootStackParamList
