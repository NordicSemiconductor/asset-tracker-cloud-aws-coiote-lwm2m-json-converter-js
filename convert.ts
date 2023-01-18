import { convertValue } from './convertValue'
import { resourceNameToUrn } from './resourceNameToUrn'

export type NoValue = { noValue: boolean }
export type CoioteLwM2MObject = Record<string, Record<string, string | NoValue>>
export type CoioteLwM2M = Record<string, CoioteLwM2MObject>

// FIXME: use @nordicsemiconductor/lwm2m-types
export type LwM2MObject =
	| Record<string, number | string | boolean>
	| Array<Record<string, number | string | boolean>>
export type LwM2MDocument = Record<string, LwM2MObject>

/**
 * Convert a Coiote LwM2M JSON encoding the nRF Asset Tracker's LwM2M JSON encoding.
 *
 * @see https://github.com/NordicSemiconductor/lwm2m-types-js
 *
 * @throws Exception if input cannot be converted
 */
export const convert = (input: CoioteLwM2M): LwM2MDocument => {
	const converted: LwM2MDocument = {}

	for (const [resourceName, value] of Object.entries(input)) {
		// Map the Coiote resource name to nRF Asset Tracker Lw2M2M URN
		const urn = resourceNameToUrn(resourceName)
		if (urn === null) throw new Error(`Unknown resource name: ${resourceName}`)

		// Convert Coiote's JSON representation to nRF Asset Tracker JSON representation
		const convertedValue = convertValue(resourceName, value)
		if (convertedValue === null)
			throw new Error(
				`Failed to convert ${resourceName} (${JSON.stringify(value)})`,
			)
		converted[urn] = convertedValue
	}

	return converted
}
