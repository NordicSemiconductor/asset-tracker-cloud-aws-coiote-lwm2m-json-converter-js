import type {
	AssetTrackerLwM2MDocument,
	AssetTrackerLwM2MShadowDocument,
} from './types'

/**
 * Validate LwM2M object definitions that are not defined in the LwM2M object registry:
 *
 * Right now these are known:
 * - asset_tracker_v2 configuration
 *
 * FIXME: Implement Configuration validation
 */
export const validateCustomObjects = (
	input: AssetTrackerLwM2MDocument,
):
	| { value: AssetTrackerLwM2MShadowDocument }
	| {
			error: Error
	  } => ({ value: input })
