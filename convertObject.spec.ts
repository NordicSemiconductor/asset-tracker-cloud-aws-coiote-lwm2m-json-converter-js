import { convertObject } from './convertObject'

describe('convertObject()', () => {
	it(`should convert known LwM2M object`, () =>
		expect(
			convertObject('Humidity', {
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
			}),
		).toMatchObject([
			{
				'5518': 1665149602,
				'5601': 31.064,
				'5602': 31.064,
				'5603': 0,
				'5604': 100,
				'5700': 28.927,
				'5701': '%',
			},
		]))

	describe('object conversion for unregistered objects', () => {
		it('should convert Configuration', () =>
			expect(
				convertObject('Configuration', {
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
				}),
			).toMatchObject({
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
			}))
	})
})
