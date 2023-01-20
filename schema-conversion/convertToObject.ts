import type {
	AssetTrackerLwM2MObject,
	AssetTrackerLwM2MObjectPropertyValue,
	CoioteLwM2MObject,
	CoioteLwM2MObjectProperties,
	CoioteLwM2MObjectPropertyValue,
} from '../types'
import type { Schema } from './convertObjectUsingSchema'

export const convertToObject = (
	schema: Schema,
	objectDefinition: CoioteLwM2MObject,
): AssetTrackerLwM2MObject | null => {
	const props = Object.values(objectDefinition)[0]
	if (props === undefined) return null
	return convertSingleObject(schema, props)
}

const convertSingleObject = (
	schema: Schema,
	properties: CoioteLwM2MObjectProperties,
): AssetTrackerLwM2MObject => {
	const converted: AssetTrackerLwM2MObject = {}

	for (const [resourceName, value] of Object.entries(properties)) {
		const resourceId = resourceNameToId(schema, resourceName)
		if (resourceId === null) continue
		const convertedValue = convertResource(schema, resourceId, value)
		if (convertedValue === null) continue
		converted[resourceId] = convertedValue
	}

	return converted
}

const convertResource = (
	schema: Schema,
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

	return convertValue(value as string, resource.type)
}

const convertValue = (
	value: string,
	type: 'integer' | 'number' | 'boolean' | 'string',
): AssetTrackerLwM2MObjectPropertyValue | null => {
	switch (type) {
		case 'integer':
			return parseInt(value, 10)
		case 'boolean':
			return value === '1' ? true : false // value === 'true' || value === '1'
		case 'string':
			return value
		default:
			return null
	}
}

/**
 * Values are marked as not present in the shadow using the special object `{"noValue": true}`
 */
const isNoValue = (value: CoioteLwM2MObjectPropertyValue): boolean =>
	typeof value === 'object' && 'noValue' in value

/**
 * Finds the LwM2M resource Id using the name used in the shadow
 */
const resourceNameToId = (
	schema: Schema,
	resourceName: string,
): string | null => {
	const resourceByName = Object.entries(schema.properties).find(
		([, { title }]) => title === resourceName,
	)
	if (resourceByName === undefined) return null
	return resourceByName[0]
}
