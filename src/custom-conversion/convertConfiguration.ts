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
 */
export const convertConfiguration = (
	value: CoioteLwM2MConfigurationObject,
): AssetTrackerLwM2MConfigurationObject | null => ({
	'1': parseFloat(value['0']['Accelerometer activity threshold']),
	'2': parseFloat(value['0']['Accelerometer inactivity threshold']),
	'3': parseFloat(value['0']['Accelerometer inactivity timeout']),
	'4': parseInt(value['0']['Active wait time'], 10),
	// Is now called location timeout
	'5': value['0']['GNSS enable'] === 'true',
	'6': parseInt(value['0']['GNSS timeout'], 10),
	'7': parseInt(value['0']['Movement resolution'], 10),
	'8': parseInt(value['0']['Movement timeout'], 10),
	'9': value['0']['Neighbor cell measurements enable'] === 'true',
	'10': !(value['0']['Passive mode'] === 'true'),
})
