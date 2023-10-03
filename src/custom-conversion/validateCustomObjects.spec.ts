import { validateCustomObjects } from './validateCustomObjects.js'

describe('validateCustomObjects()', () => {
	describe('should remove invalid custom objects', () => {
		test('remove invalid config', () => {
			const input = {
				'50009@1.2': {
					'42': '666',
				},
			}
			const output = validateCustomObjects(input as any)
			expect(output['50009@1.2']).toBeUndefined()
		})
	})
})
