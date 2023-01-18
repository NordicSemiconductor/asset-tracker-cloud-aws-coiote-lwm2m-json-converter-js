import type { CoioteLwM2MObject, LwM2MObject } from './convert'
import { convertRegisteredObject } from './convertRegisteredObject'

export const convertValue = (
	resourceName: string,
	value: CoioteLwM2MObject,
): LwM2MObject | null => {
	// Try to interpret the value as a registered LwM2M object
	const fromLwM2MRegistry = convertRegisteredObject(resourceName, value)
	if (fromLwM2MRegistry !== null) return fromLwM2MRegistry

	// More alternatives to follow ...
	// Is it config?
	// Is it Location Assistance?

	// We could not convert it.
	return null
}
