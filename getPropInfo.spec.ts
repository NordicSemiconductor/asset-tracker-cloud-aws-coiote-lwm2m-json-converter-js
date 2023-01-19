import { getPropInfo } from './getPropInfo'
import LwM2MSchema from './node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json'

describe("get property info from 'Temperature' resource", () => {
	const schema: Record<string, any> = LwM2MSchema.properties['3303:1.1']
	const resourceType = LwM2MSchema.properties['3303:1.1'].type as any // 'array'
	it.each([
		['Min Measured Value', { id: '5601', type: 'number' }],
		['Application Type', { id: '5750', type: 'string' }],
		['Measurement Quality Indicator', { id: '6042', type: 'integer' }],
	])('type from prop (%s) should be (%s) ', (propName, expected) => {
		expect(getPropInfo(propName, resourceType, schema)).toMatchObject(expected)
	})

	it('should return id and data type from "rsrp-Result" ', () => {
		const schema: Record<string, any> = LwM2MSchema.properties['10256'] // 'array'
		const resourceType = LwM2MSchema.properties['10256'].type as any
		const correctValue = 'rsrp-Result '
		const incorrectValue = 'rsrp-Result'

		// just one white space between both values

		expect(getPropInfo(correctValue, resourceType, schema)).toMatchObject({
			id: '3',
			type: 'integer',
		})
		expect(getPropInfo(incorrectValue, resourceType, schema)).toBe(undefined)
	})
})
