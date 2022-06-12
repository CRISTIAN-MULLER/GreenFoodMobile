import { Dispatch, SetStateAction } from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

export const brazilianStates = {
	Rondônia: {
		codigoUF: 11,
		uF: 'RO',
		nome: 'Rondônia',
		latitude: -10.83,
		longitude: -63.34,
		regiao: 'Norte',
	},
	Acre: {
		codigoUF: 12,
		uF: 'AC',
		nome: 'Acre',
		latitude: -8.77,
		longitude: -70.55,
		regiao: 'Norte',
	},
	Amazonas: {
		codigoUF: 13,
		uF: 'AM',
		nome: 'Amazonas',
		latitude: -3.47,
		longitude: -65.1,
		regiao: 'Norte',
	},
	Roraima: {
		codigoUF: 14,
		uF: 'RR',
		nome: 'Roraima',
		latitude: 1.99,
		longitude: -61.33,
		regiao: 'Norte',
	},
	Pará: {
		codigoUF: 15,
		uF: 'PA',
		nome: 'Pará',
		latitude: -3.79,
		longitude: -52.48,
		regiao: 'Norte',
	},
	Amapá: {
		codigoUF: 16,
		uF: 'AP',
		nome: 'Amapá',
		latitude: 1.41,
		longitude: -51.77,
		regiao: 'Norte',
	},
	Tocantins: {
		codigoUF: 17,
		uF: 'TO',
		nome: 'Tocantins',
		latitude: -9.46,
		longitude: -48.26,
		regiao: 'Norte',
	},
	Maranhão: {
		codigoUF: 21,
		uF: 'MA',
		nome: 'Maranhão',
		latitude: -5.42,
		longitude: -45.44,
		regiao: 'Nordeste',
	},
	Piauí: {
		codigoUF: 22,
		uF: 'PI',
		nome: 'Piauí',
		latitude: -6.6,
		longitude: -42.28,
		regiao: 'Nordeste',
	},
	Ceará: {
		codigoUF: 23,
		uF: 'CE',
		nome: 'Ceará',
		latitude: -5.2,
		longitude: -39.53,
		regiao: 'Nordeste',
	},
	'Rio Grande do Norte': {
		codigoUF: 24,
		uF: 'RN',
		nome: 'Rio Grande do Norte',
		latitude: -5.81,
		longitude: -36.59,
		regiao: 'Nordeste',
	},
	Paraíba: {
		codigoUF: 25,
		uF: 'PB',
		nome: 'Paraíba',
		latitude: -7.28,
		longitude: -36.72,
		regiao: 'Nordeste',
	},
	Pernambuco: {
		codigoUF: 26,
		uF: 'PE',
		nome: 'Pernambuco',
		latitude: -8.38,
		longitude: -37.86,
		regiao: 'Nordeste',
	},
	Alagoas: {
		codigoUF: 27,
		uF: 'AL',
		nome: 'Alagoas',
		latitude: -9.62,
		longitude: -36.82,
		regiao: 'Nordeste',
	},
	Sergipe: {
		codigoUF: 28,
		uF: 'SE',
		nome: 'Sergipe',
		latitude: -10.57,
		longitude: -37.45,
		regiao: 'Nordeste',
	},
	Bahia: {
		codigoUF: 29,
		uF: 'BA',
		nome: 'Bahia',
		latitude: -13.29,
		longitude: -41.71,
		regiao: 'Nordeste',
	},
	'Minas Gerais': {
		codigoUF: 31,
		uF: 'MG',
		nome: 'Minas Gerais',
		latitude: -18.1,
		longitude: -44.38,
		regiao: 'Sudeste',
	},
	'Espírito Santo': {
		codigoUF: 32,
		uF: 'ES',
		nome: 'Espírito Santo',
		latitude: -19.19,
		longitude: -40.34,
		regiao: 'Sudeste',
	},
	'Rio de Janeiro': {
		codigoUF: 33,
		uF: 'RJ',
		nome: 'Rio de Janeiro',
		latitude: -22.25,
		longitude: -42.66,
		regiao: 'Sudeste',
	},
	'São Paulo': {
		codigoUF: 35,
		uF: 'SP',
		nome: 'São Paulo',
		latitude: -22.19,
		longitude: -48.79,
		regiao: 'Sudeste',
	},
	Paraná: {
		codigoUF: 41,
		uF: 'PR',
		nome: 'Paraná',
		latitude: -24.89,
		longitude: -51.55,
		regiao: 'Sul',
	},
	'Santa Catarina': {
		codigoUF: 42,
		uF: 'SC',
		nome: 'Santa Catarina',
		latitude: -27.45,
		longitude: -50.95,
		regiao: 'Sul',
	},
	'Rio Grande do Sul': {
		codigoUF: 43,
		uF: 'RS',
		nome: 'Rio Grande do Sul',
		latitude: -30.17,
		longitude: -53.5,
		regiao: 'Sul',
	},
	'Mato Grosso do Sul': {
		codigoUF: 50,
		uF: 'MS',
		nome: 'Mato Grosso do Sul',
		latitude: -20.51,
		longitude: -54.54,
		regiao: 'Centro-Oeste',
	},
	'Mato Grosso': {
		codigoUF: 51,
		uF: 'MT',
		nome: 'Mato Grosso',
		latitude: -12.64,
		longitude: -55.42,
		regiao: 'Centro-Oeste',
	},
	Goiás: {
		codigoUF: 52,
		uF: 'GO',
		nome: 'Goiás',
		latitude: -15.98,
		longitude: -49.86,
		regiao: 'Centro-Oeste',
	},
	'Distrito Federal': {
		codigoUF: 53,
		uF: 'DF',
		nome: 'Distrito Federal',
		latitude: -15.83,
		longitude: -47.86,
		regiao: 'Centro-Oeste',
	},
}

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
		coordinates: {
			latitude: number
			longitude: number
			latitudeDelta: number
			longitudeDelta: number
		}
	}
	isFavorite: boolean
}

export interface AddressHandleProps extends RectButtonProps {
	data: UserAddressProps
	isSelected: boolean
	refresh: boolean
	setRefresh: Dispatch<SetStateAction<boolean>>
	handleSelectedAddress: (arg0: UserAddressProps) => void
}
