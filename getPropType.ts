type Prop = Record<'type', string>

type Properties = Record<string, Prop>

type Items = Record<string, Properties>

export type PropSchema = Record<string, Items | Properties>

/**
 * Return type of given prop
 */
export const getPropType = (
	propName: string,
	resourceType: 'array' | 'object',
	schema: PropSchema,
): undefined | string => {
	const source =
		resourceType === 'array' ? schema.items!.properties : schema.properties

	const match = Object.entries(source!).find(
		([, { title }]) => title === propName,
	)

	if (match === undefined) return undefined

	const [, { type }] = match

	return type
}
