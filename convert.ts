import { validate } from '@nordicsemiconductor/lwm2m-types'
import { convertObject } from './convertObject'
import { resourceNameToUrn } from './resourceNameToUrn'
import type {
	AssetTrackerLwM2MDocument,
	AssetTrackerLwM2MShadowDocument,
	CoioteLwM2M,
} from './types'
import { validateCustomObjects } from './validateCustomObjects'

/**
 * Convert a Coiote LwM2M JSON encoding the nRF Asset Tracker's LwM2M JSON encoding.
 *
 * @see https://github.com/NordicSemiconductor/lwm2m-types-js
 *
 * @throws Exception if input cannot be converted
 */
export const convert = (
	input: CoioteLwM2M,
): AssetTrackerLwM2MShadowDocument => {
	const converted: AssetTrackerLwM2MDocument = {}
	for (const [resourceName, value] of Object.entries(input)) {
		// Map the Coiote resource name to nRF Asset Tracker Lw2M2M URN
		const urn = resourceNameToUrn(resourceName)
		if (urn === null) throw new Error(`Unknown resource name: ${resourceName}`)

		// Convert Coiote's JSON representation to nRF Asset Tracker JSON representation
		const convertedValue = convertObject(resourceName, value)
		if (convertedValue === null)
			throw new Error(
				`Failed to convert ${resourceName} (${JSON.stringify(value)})`,
			)
		converted[urn] = convertedValue
	}

	// Validate built-in types
	const validatedRegisteredObjects = validate(converted)
	if ('errors' in validatedRegisteredObjects)
		throw new Error(
			`Invalid LwM2M object definition received: ${JSON.stringify(
				validatedRegisteredObjects.errors,
			)}`,
		)

	// Validate the custom types
	const validatedCustomObjects = validateCustomObjects(
		validatedRegisteredObjects.value,
	)
	if ('error' in validatedCustomObjects)
		throw new Error(
			`Invalid custom LwM2M object definition received: ${JSON.stringify(
				validatedCustomObjects.error,
			)}`,
		)

	return validatedCustomObjects.value
}
