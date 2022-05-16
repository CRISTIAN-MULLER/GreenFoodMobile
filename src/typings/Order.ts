export type OrderProps = {
	_id?: string
	orderNumber?: number
	customerId: string
	deliveryAddress: {
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
	items: [
		{
			productId: string
			name: string
			image: string
			saleUnit: {
				saleUnit: string
				description: string
				price: number
				active: boolean
			}
			itemTotalQty: number
			itemTotalPrice: number
		},
	]
	phone: string
	payment: {
		paymentMethod: string
		paymentStatus: string
		cardBrand: string
		change: number
	}
	origin: string
	status: string
	step: number
	observation: string
}
