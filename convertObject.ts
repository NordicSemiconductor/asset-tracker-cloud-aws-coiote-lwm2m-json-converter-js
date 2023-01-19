import {
	CoioteLwM2MConfigurationObject,
	convertConfiguration,
} from './convertConfiguration'
import { convertRegisteredObject } from './convertRegisteredObject'
import type { CoioteLwM2MObject, LwM2MObject } from './types'

export const convertObject = (
	resourceName: string,
	value: CoioteLwM2MObject,
): LwM2MObject | null => {
	// Try to interpret the value as a registered LwM2M object
	const fromLwM2MRegistry = convertRegisteredObject(resourceName, value)
	if (fromLwM2MRegistry !== null) return fromLwM2MRegistry

	// Is it asset_tracker_v2 configuration?
	if (resourceName === 'Configuration')
		return convertConfiguration(value as CoioteLwM2MConfigurationObject)

	// We could not convert it.
	return null
}
