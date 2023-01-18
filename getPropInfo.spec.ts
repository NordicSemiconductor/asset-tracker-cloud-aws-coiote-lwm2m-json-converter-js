import { getPropInfo } from './getPropInfo'
import LwM2MSchema from './node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json'

describe("get property info from 'Temperature' resource", () => {
	const schema: Record<string, any> = LwM2MSchema.properties['3303:1.1']
	const resourceType = 'array'
	it.each([
		['Min Measured Value', { id: '5601', type: 'number' }],
		['Application Type', { id: '5750', type: 'string' }],
		['Measurement Quality Indicator', { id: '6042', type: 'integer' }],
	])('type from prop (%s) should be (%s) ', (propName, expected) => {
		expect(getPropInfo(propName, resourceType, schema)).toMatchObject(expected)
	})
})
