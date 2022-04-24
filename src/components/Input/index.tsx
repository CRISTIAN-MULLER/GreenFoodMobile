import React, { ReactElement } from 'react'

import { Container, TextInput, MaskTextInput } from './styles'

interface propsInput {
	width?: string
	icon: ReactElement | false
	placeholder: string
	mask?: boolean
	value: string
	type?: any
	options?: any
	onChangeText: (text: string) => void
}

const Input: React.FC<propsInput> = ({
	width,
	icon,
	placeholder,
	mask,
	value,
	type,
	options,
	onChangeText,
}) => (
	<Container width={width}>
		{icon && icon}

		{mask ? (
			<MaskTextInput
				keyboardType='number-pad'
				value={value}
				type={type}
				options={options}
				onChangeText={(text) => onChangeText(text)}
				placeholder={placeholder}
			/>
		) : (
			<TextInput
				autoCapitalize='characters'
				value={value}
				onChangeText={(text) => onChangeText(text)}
				placeholder={placeholder}
			/>
		)}
	</Container>
)

export default Input
