import React from 'react'

import IconElo from '../../../assets/icon-elo'
import IconHipercard from '../../../assets/icon-hiper-card'
import IconMaster from '../../../assets/icon-mastercard'
import IconVisa from '../../../assets/icon-visa'
import IconAmex from '../../../assets/icon-amex'
import LogoSVG from '../../../assets/LogoSVG'
import IconDiners from '../../../assets/icon-diners'
import IconMaestro from '../../../assets/icon-maestro'

const { cardType } = require('@polvo-labs/card-type')

interface propsBrand {
	[key: string]: any
}

const cardBrand: propsBrand = {
	visa: {
		icon: <IconVisa width={'20%'} height={'20%'} />,
	},
	mastercard: {
		icon: <IconMaster width={'25%'} height={'25%'} />,
	},

	amex: {
		icon: <IconAmex width={'25%'} height={'25%'} />,
	},

	diners: {
		icon: <IconDiners width={'20%'} height={'25%'} />,
	},

	maestro: {
		icon: <IconMaestro width={'20%'} height={'25%'} />,
	},

	elo: {
		icon: <IconElo width={'20%'} height={'25%'} />,
	},

	hipercard: {
		icon: <IconHipercard width={'20%'} height={'20%'} />,
	},

	undefined: {
		icon: <LogoSVG width={'25%'} height={'25%'} />,
	},
}

export const getBrand = (cardNumber: string) => {
	const brand = cardType(cardNumber)
	return brand
}

export const getBrandIcon = (number: string) => {
	if (number && number.length >= 6) {
		const brandIcon = getBrand(number)
		if (!brandIcon) {
			return cardBrand['undefined']
		}
		return cardBrand.hasOwnProperty(brandIcon) ? cardBrand[brandIcon] : false
	}
}
