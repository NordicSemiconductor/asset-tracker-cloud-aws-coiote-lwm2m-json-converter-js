type Prop = Record<'type', string>

type Properties = Record<string, Prop>

type Items = Record<string, Properties>

export type PropSchema = Record<string, Items | Properties>

/**
 * Return type and id from given prop
 */
export const getPropInfo = (
	propName: string,
	resourceType: 'array' | 'object',
	schema: PropSchema,
): undefined | Record<string, string> => {
	const source =
		resourceType === 'array' ? schema.items!.properties : schema.properties

	const match = Object.entries(source!).find(
		([id, { title }]) => title === propName,
	)

	if (match === undefined) return undefined

	const [id, { type }] = match

	return { id, type }
}
