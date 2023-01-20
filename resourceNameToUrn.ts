import { LwM2MDocumentSchema } from '@nordicsemiconductor/lwm2m-types'
import { ConfigurationURN } from './custom-conversion/convertConfiguration'

/**
 * Returns the LwM2M URN used by nRF Asset Tracker for the resource name used by Coiote.
 *
 * This assumes that all objects sent by asset_tracker_v2 follow the latest LwM2M definition in the LwM2M object registry.
 */
export const resourceNameToUrn = (resourceName: string): string | null => {
	// Some resources used in asset_tracker_v2 are not registered objects
	// FIXME use createURN from '@nordicsemiconductor/lwm2m-types'
	if (resourceName === 'Configuration') {
		// FIXME: Access Coiote Dialects, check LwM2M object ID, LwM2M version, Object version
		return ConfigurationURN
	}
	const match = Object.entries(LwM2MDocumentSchema.properties).find(
		([, { title }]) => title === resourceName,
	)
	if (match === undefined) return null
	const [id] = match
	return id
}
