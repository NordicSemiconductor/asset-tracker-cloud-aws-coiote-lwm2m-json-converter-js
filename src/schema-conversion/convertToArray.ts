import type {
	AssetTrackerLwM2MObject,
	CoioteLwM2MObject,
	CoioteLwM2MObjectProperties,
} from '../types.js'
import type { ArraySchema } from './convertObjectUsingSchema.js'
import { convertResource } from './convertResource.js'
import { resourceNameToId } from './resourceNameToId.js'

export const convertToArray = (
	schema: ArraySchema,
	arrayDefinition: CoioteLwM2MObject,
): Array<AssetTrackerLwM2MObject> | null =>
	Object.values(arrayDefinition)
		.map((objectDefinition) => convertElementOfArray(schema, objectDefinition))
		.filter((v) => v !== null) as Array<AssetTrackerLwM2MObject>

/**
 * Given the schema and the value, convert to LwM2M
 */
export const convertElementOfArray = (
	schema: ArraySchema,
	properties: CoioteLwM2MObjectProperties,
): AssetTrackerLwM2MObject | null => {
	const converted: AssetTrackerLwM2MObject = {}

	for (const [resourceName, value] of Object.entries(properties)) {
		const resourceId = resourceNameToId(schema.items, resourceName)
		if (resourceId === null) continue
		const convertedValue = convertResource(schema.items, resourceId, value)
		if (convertedValue === null) continue
		converted[resourceId] = convertedValue
	}

	return converted
}
