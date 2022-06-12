import React, { ComponentProps, FC } from 'react'

const combineComponents = (...components: FC[]): FC =>
	components.reduce(
		(AccumulatedComponents, CurrentComponent) =>
			({ children }: ComponentProps<FC>): JSX.Element =>
				(
					<AccumulatedComponents>
						<CurrentComponent>{children}</CurrentComponent>
					</AccumulatedComponents>
				),
		({ children }) => <>{children}</>,
	)

export default combineComponents
