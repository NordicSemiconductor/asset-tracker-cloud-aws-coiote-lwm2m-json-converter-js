import type {
	AssetTrackerLwM2MObject,
	CoioteLwM2MObject,
	CoioteLwM2MObjectProperties,
} from '../types'
import type { ObjectSchema } from './convertObjectUsingSchema'
import { convertResource } from './convertResource'
import { resourceNameToId } from './resourceNameToId'

export const convertToObject = (
	schema: ObjectSchema,
	objectDefinition: CoioteLwM2MObject,
): AssetTrackerLwM2MObject | null => {
	const props = Object.values(objectDefinition)[0]
	if (props === undefined) return null
	return convertSingleObject(schema, props)
}

export const convertSingleObject = (
	schema: ObjectSchema,
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
