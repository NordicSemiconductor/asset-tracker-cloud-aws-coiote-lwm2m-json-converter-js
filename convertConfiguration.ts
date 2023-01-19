export const ConfigurationURN = '50009@1.2'
export type AssetTrackerLwM2MConfigurationObject = Readonly<{
	'1': number
	'2': number
	'3': number
	'4': number
	'5': boolean
	'6': number
	'7': number
	'8': number
	'9': boolean
	'10': boolean
}>

export type CoioteLwM2MConfigurationObject = {
	'0': {
		'Accelerometer activity threshold': string
		'Accelerometer inactivity threshold': string
		'Accelerometer inactivity timeout': string
		'Active wait time': string
		'GNSS enable': string
		'GNSS timeout': string
		'Movement resolution': string
		'Movement timeout': string
		'Neighbor cell measurements enable': string
		'Passive mode': string
	}
}
/**
 * Convert the LwM2M representation of the asset_tracker_v2 real-time configuration.
 *
 * FIXME: Implement conversion
 */
export const convertConfiguration = (
	value: CoioteLwM2MConfigurationObject,
): AssetTrackerLwM2MConfigurationObject | null => ({
	'1': 10.0,
	'2': 5.0,
	'3': 60.0,
	'4': 120,
	'5': true,
	'6': 30,
	'7': 120,
	'8': 3600,
	'9': true,
	'10': false,
})
