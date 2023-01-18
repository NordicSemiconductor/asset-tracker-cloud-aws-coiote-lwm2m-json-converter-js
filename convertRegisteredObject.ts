import type { CoioteLwM2MObject, LwM2MObject } from './convert'
import { convertValueUsingSchema } from './convertValueUsingSchema'
import LwM2MSchema from './node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json'
import { resourceNameToUrn } from './resourceNameToUrn'

export const convertRegisteredObject = (
	resourceName: string,
	value: CoioteLwM2MObject,
): LwM2MObject | null => {
	const urn = resourceNameToUrn(resourceName)
	if (urn === null) return null

	const objectSchema =
		LwM2MSchema.properties[urn as keyof (typeof LwM2MSchema)['properties']]

	if (objectSchema !== undefined)
		return convertValueUsingSchema(objectSchema, value)

	return null
}
