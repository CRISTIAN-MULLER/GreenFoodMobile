import React, { ReactElement } from 'react'

import { Container, Content, View, Text, ViewInformation } from './styles'

interface propsCard {
	cardHolderName: string
	cardNumber: string
	cardName: string
	icon: ReactElement | boolean
}

const MiniCard: React.FC<propsCard> = ({
	cardHolderName,
	cardNumber,
	cardName,
	icon,
}) => (
	<Container>
		<Content>
			<ViewInformation>
				<View>
					<Text fontSize='12px'>{cardName}</Text>
					<Text fontSize='12px'>**** **** **** {cardNumber.slice(-4)}</Text>
					<Text fontSize='14px'>{cardHolderName}</Text>
				</View>
				{icon && icon}
			</ViewInformation>
		</Content>
	</Container>
)

export default MiniCard
