import { castData } from './castData'
import type {
	CoioteLwM2MObject,
	LwM2MPRops,
	PropsObject,
	Value,
} from './convert'

import { getPropInfo } from './getPropInfo'
import { isNotProvidedValue } from './isNotProvidedValue'

export const convertObjectUsingSchema = (
	schema: Record<string, any>,
	value: CoioteLwM2MObject,
): LwM2MPRops | LwM2MPRops[] => {
	const resourceType = schema.type

	const propsArray = Object.values(value) // remove map struct
		.map((props: PropsObject) => processProps(props, resourceType, schema))

	if (resourceType === 'object') {
		const object = propsArray.reduce((current, previus) => {
			return { ...current, ...previus }
		}, {})
		return object
	}

	return propsArray // array
}

const processProps = (
	props: PropsObject,
	resourceType: 'object' | 'array',
	schema: Record<string, any>,
): LwM2MPRops => {
	return Object.entries(props)
		.map(
			([name, value]: [string, Value]):
				| undefined
				| { [x: string]: string | number | boolean | string[] } => {
				if (isNotProvidedValue(value)) {
					return undefined
				}

				const { id, type } = getPropInfo(name, resourceType, schema)!
				const castedValue = castData(type!, value as string)
				return { [`${id}`]: castedValue }
			},
		)
		.filter((prop) => prop !== undefined)
		.reduce((previus: LwM2MPRops, current) => {
			return { ...previus, ...current }
		}, {})
}
