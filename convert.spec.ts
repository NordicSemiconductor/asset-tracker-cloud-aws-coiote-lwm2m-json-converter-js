type NoValue = { noValue: true }
type CoioteLwM2M = Record<
	string,
	Record<string, Record<string, string | NoValue>>
>
const convert = (input: CoioteLwM2M) => ({
	'3303:1.1': [
		{
			'5518': 1665149633,
			'5601': 23.51,
			'5602': 23.51,
			'5603': -40,
			'5604': 85,
			'5700': 24.57,
			'5701': 'Celsius degrees',
		},
	],
})

describe('convert()', () => {
	it(`should convert Coiote's LwM2M JSON encoding to nRF Asset Tracker LwM2M JSON encoding`, () =>
		expect(
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
			}),
		).toMatchObject({
			'3303:1.1': [
				{
					'5518': 1665149633,
					'5601': 23.51,
					'5602': 23.51,
					'5603': -40,
					'5604': 85,
					'5700': 24.57,
					'5701': 'Celsius degrees',
				},
			],
		}))
})
