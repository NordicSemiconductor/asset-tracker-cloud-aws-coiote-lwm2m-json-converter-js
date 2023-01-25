import type {
	AssetTrackerLwM2MObjectPropertyValue,
	CoioteLwM2MObjectPropertyValue,
} from '../types.js'
import type { ObjectSchema } from './convertObjectUsingSchema.js'

export const convertResource = (
	schema: ObjectSchema,
	resourceId: string,
	value: CoioteLwM2MObjectPropertyValue,
):
	| AssetTrackerLwM2MObjectPropertyValue
	| Array<AssetTrackerLwM2MObjectPropertyValue>
	| null => {
	// Special case where Coiote writes more complex values as `{}` to the shadow
	if (typeof value === 'object' && Object.keys(value).length === 0) return null

	if (isNoValue(value)) return null

	const resource = schema.properties[resourceId]
	if (resource === undefined) return null

	if (resource.type === 'array') {
		const itemType = resource.items.type
		return Object.values(value as string[])
			.map((v) => convertValue(v, itemType))
			.filter((v) => v !== null) as Array<AssetTrackerLwM2MObjectPropertyValue>
	}

	if (resource?.unixTimestamp === true && resource.type === 'integer')
		return convertValue(value as string, 'timestamp')

	return convertValue(value as string, resource.type)
}

/**
 * Cast value to expected type
 *
 * Integer case contain a special validation because in LwM2M, Boolean is an
 * 8 bit unsigned integer with the value 0 for False and the value 1 for True
 * @see https://www.openmobilealliance.org/release/LightweightM2M/V1_1_1-20190617-A/OMA-TS-LightweightM2M_Core-V1_1_1-20190617-A.pdf Pag 106 Table: C.-1 Data Types
 */
export const convertValue = (
	value: string,
	type: 'integer' | 'number' | 'boolean' | 'string' | 'timestamp',
): AssetTrackerLwM2MObjectPropertyValue | null => {
	switch (type) {
		case 'timestamp':
			return new Date(value).getTime() / 1000
		case 'integer': {
			if (value === 'true' || value === 'false') {
				return value === 'true' ? 1 : 0
			}
			return parseInt(value, 10)
		}
		case 'number':
			return parseFloat(value)
		case 'boolean':
			return value === 'true' ? true : false
		case 'string':
			return value
		default:
			return null
	}
}

/**
 * Values are marked as not present in the shadow using the special object `{"noValue": true}`
 */
export const isNoValue = (value: CoioteLwM2MObjectPropertyValue): boolean =>
	typeof value === 'object' && 'noValue' in value
