import assert from 'node:assert/strict'
import { convert } from './convert'

const converted = convert({
	Temperature: {
		'0': {
			'Application Type': '',
			'Fractional Timestamp': {
				noValue: true,
			},
			'Max Measured Value': '23.51',
			'Max Range Value': '85.0',
			'Measurement Quality Indicator': {
				noValue: true,
			},
			'Measurement Quality Level': {
				noValue: true,
			},
			'Min Measured Value': '23.51',
			'Min Range Value': '-40.0',
			'Reset Min and Max Measured Values': {
				noValue: true,
			},
			'Sensor Units': 'Celsius degrees',
			'Sensor Value': '24.57',
			Timestamp: '2022-10-07T13:33:22Z',
		},
	},
})

assert.deepEqual(converted, {
	'3303:1.1': [
		{
			'5518': 1665149602,
			'5601': 23.51,
			'5602': 23.51,
			'5603': -40,
			'5604': 85,
			'5700': 24.57,
			'5701': 'Celsius degrees',
			'5750': '',
		},
	],
})
