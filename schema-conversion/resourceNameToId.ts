/**
 * Finds the LwM2M resource Id using the name used in the shadow
 */
export const resourceNameToId = (
	schema: { properties: Record<string, { title: string }> },
	resourceName: string,
): string | null => {
	const resourceByName = Object.entries(schema.properties).find(
		([, { title }]) => title === resourceName,
	)
	if (resourceByName === undefined) return null
	return resourceByName[0]
}
