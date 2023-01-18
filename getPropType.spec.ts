import { getPropType } from './getPropType'
import LwM2MSchema from './node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json'

describe("getPropType from 'array' resource", () => {
	const schema: Record<string, any> = LwM2MSchema.properties['3303:1.1']
	const resourceType = 'array'
	it.each([
		['Min Measured Value', 'number'],
		['Application Type', 'string'],
		['Measurement Quality Indicator', 'integer'],
	])('type from prop (%s) should be (%s) ', (propName, expected) => {
		expect(getPropType(propName, resourceType, schema)).toBe(expected)
	})
})
