// FIXME: use @nordicsemiconductor/lwm2m-types
import type { LwM2MDocument } from './convert'
import LwM2MSchema from './node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json'

/**
 * Returns the LwM2M URN used by nRF Asset Tracker for the resource name used by Coiote.
 *
 * This assumes that all objects sent by asset_tracker_v2 follow the latest LwM2M definition in the LwM2M object registry.
 */
export const resourceNameToUrn = (
	resourceName: string,
): keyof LwM2MDocument | null => {
	const match = Object.entries(LwM2MSchema.properties).find(
		([, { title }]) => title === resourceName,
	)
	if (match === undefined) return null
	const [id] = match
	return id
}
