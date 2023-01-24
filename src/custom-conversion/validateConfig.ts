import Ajv from 'ajv'
import type { AssetTrackerLwM2MConfigurationObject } from './convertConfiguration.js'

const configSchema = {
	$schema: 'http://json-schema.org/draft-07/schema#',
	$id: 'https://github.com/NordicSemiconductor/asset-tracker-cloud-docs/blob/saga/docs/cloud-protocol/cfg.schema.json',
	description: 'Configures the device',
	type: 'object',
	properties: {
		10: {
			description: 'Whether to enable the active mode.',
			type: 'boolean',
			examples: [false],
		},
		4: {
			description:
				'In active mode: Wait this amount of seconds until sending the next update. The actual interval will be this time plus the time it takes to get a GNSS fix.',
			type: 'integer',
			minimum: 1,
			maximum: 2147483647,
			examples: [60],
		},
		7: {
			description:
				'Movement resolution (in seconds): After detecting movement in passive mode send an update and wait this amount of time until movement again can trigger the next update.',
			type: 'integer',
			minimum: 1,
			maximum: 2147483647,
			examples: [300],
		},
		8: {
			description:
				'Movement timeout (in seconds): Send update at least this often in passive mode.',
			type: 'integer',
			minimum: 1,
			maximum: 2147483647,
			examples: [3600],
		},
		6: {
			description: 'GNSS timeout (in seconds): Timeout for GNSS fix.',
			type: 'integer',
			minimum: 1,
			maximum: 2147483647,
			examples: [60],
		},
		1: {
			description:
				'Accelerometer activity threshold (in m/s²): Minimal absolute value for an accelerometer reading to be considered movement.',
			type: 'number',
			minimum: 0,
			maximum: 78.4532,
			examples: [10.5],
		},
		2: {
			description:
				'Accelerometer inactivity threshold (in m/s²): Maximum absolute value for an accelerometer reading to be considered stillness. Must be smaller than the accelerometer activity threshold.',
			type: 'number',
			minimum: 0,
			maximum: 78.4532,
			examples: [5.2],
		},
		3: {
			description:
				'Accelerometer inactivity timeout (in s): Hysteresis timeout for stillness detection. Must be smaller than the movement resolution.',
			type: 'number',
			minimum: 0.08,
			maximum: 5242.88,
			examples: [1.7],
		},
		/*
        Not implemented, yet.
		nod: {
			description:
				'List of modules which should be disabled when sampling data.',
			type: 'array',
			minItems: 0,
			items: {
				type: 'string',
				minLength: 1,
			},
			examples: [['gnss'], ['ncell'], ['gnss', 'ncell']],
		},
        */
	},
	required: [
		'10',
		'4',
		'7',
		'8',
		'5',
		'1',
		'2',
		'3',
		//'nod',
	],
}

const ajv = new Ajv()
const v = ajv.compile(configSchema)

export const validateConfig = (
	configDefinition: AssetTrackerLwM2MConfigurationObject,
): boolean => v(configDefinition)
