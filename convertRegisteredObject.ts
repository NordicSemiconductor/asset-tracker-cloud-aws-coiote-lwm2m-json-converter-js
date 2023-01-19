import type { CoioteLwM2MObject, LwM2MPRops } from './convert'
import { convertObjectUsingSchema } from './convertObjectUsingSchema'
import LwM2MSchema from './node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json'
import { resourceNameToUrn } from './resourceNameToUrn'

export const convertRegisteredObject = (
	resourceName: string,
	value: CoioteLwM2MObject,
): LwM2MPRops | LwM2MPRops[] | null => {
	const urn = resourceNameToUrn(resourceName)
	if (urn === null) return null

	const objectSchema =
		LwM2MSchema.properties[urn as keyof (typeof LwM2MSchema)['properties']]

	if (objectSchema !== undefined)
		return convertObjectUsingSchema(objectSchema, value) // LwM2M resource types

	return null
}
