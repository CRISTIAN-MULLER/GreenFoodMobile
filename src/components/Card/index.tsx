import React, { ReactElement } from 'react'

import {
	Container,
	Content,
	Strip,
	TextCVV,
	View,
	Text,
	ViewInformation,
} from './styles'

interface propsCard {
	cardHolderName: string
	cardNumber: string
	expirationDate: string
	cardBrand: string
	cvv: string
	back: boolean
	icon: ReactElement | boolean
}

const Card: React.FC<propsCard> = ({
	cardHolderName,
	cardNumber,
	expirationDate,
	cardBrand,
	cvv,
	back,
	icon,
}) => {
	return (
		<Container>
			<Content>
				{back ? (
					<Strip>
						<TextCVV>{cvv}</TextCVV>
					</Strip>
				) : (
					<ViewInformation>
						<View>
							<Text bold fontSize='18px'>
								{cardNumber}
							</Text>
							<Text fontSize='16px'>{cardHolderName}</Text>
							<Text fontSize='12px'>{expirationDate}</Text>
						</View>
						{icon && icon}
					</ViewInformation>
				)}
			</Content>
		</Container>
	)
}

export default Card
