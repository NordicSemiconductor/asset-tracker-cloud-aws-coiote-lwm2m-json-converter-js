import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { convert } from './convert.js'

void describe('convert()', () => {
	void it(`should convert Coiote's LwM2M JSON encoding to nRF Asset Tracker LwM2M JSON encoding`, () => {
		assert.deepEqual(
			convert({
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
				Humidity: {
					'0': {
						'Application Type': '',
						'Fractional Timestamp': {
							noValue: true,
						},
						'Max Measured Value': '31.064',
						'Max Range Value': '100.0',
						'Measurement Quality Indicator': {
							noValue: true,
						},
						'Measurement Quality Level': {
							noValue: true,
						},
						'Min Measured Value': '31.064',
						'Min Range Value': '0.0',
						'Reset Min and Max Measured Values': {
							noValue: true,
						},
						'Sensor Units': '%',
						'Sensor Value': '28.927',
						Timestamp: '2022-10-07T13:33:22Z',
					},
				},
				Configuration: {
					'0': {
						'Accelerometer activity threshold': '10.0',
						'Accelerometer inactivity threshold': '5.0',
						'Accelerometer inactivity timeout': '60.0',
						'Active wait time': '120',
						'GNSS enable': 'true',
						'GNSS timeout': '30',
						'Movement resolution': '120',
						'Movement timeout': '3600',
						'Neighbor cell measurements enable': 'true',
						'Passive mode': 'false',
					},
				},
			}),
			{
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
				'3304:1.1': [
					{
						'5518': 1665149602,
						'5601': 31.064,
						'5602': 31.064,
						'5603': 0,
						'5604': 100,
						'5700': 28.927,
						'5701': '%',
						'5750': '',
					},
				],
				'50009@1.2': {
					'1': 10.0,
					'2': 5.0,
					'3': 60.0,
					'4': 120,
					'5': true,
					'6': 30,
					'7': 120,
					'8': 3600,
					'9': true,
					'10': true,
				},
			},
		)
	})

	void it('should throw an exception if the input cannot be converted', () => {
		assert.throws(() =>
			convert({
				foo: {
					'0': {
						'Application Type': '',
					},
				},
			}),
		)
	})

	// @see https://github.com/NordicSemiconductor/asset-tracker-cloud-coiote-aws-converter-js/issues/13
	void it('should convert object that contains the minimum allowed timestamp value as prop', () => {
		assert.deepEqual(
			convert({
				Location: {
					'0': {
						Altitude: '0.0',
						Latitude: '0.0',
						Longitude: '0.0',
						Radius: '0.0',
						Speed: '0.0',
						Timestamp: '1970-01-01T00:00:00Z', // minimum allowed value
						Velocity: '',
					},
				},
			}),
			{
				'6': { '0': 0, '1': 0, '2': 0, '3': 0, '4': '', '5': 0, '6': 0 },
			},
		)
	})
})
