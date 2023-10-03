import { validateConfig } from './validateConfig.js'

describe('validateConfig()', () => {
	it('mark invalid config', () =>
		expect(
			validateConfig({
				'42': '666',
			} as any),
		).toEqual(false))
})
