import type { z } from 'zod';

/**
 * Used to parse zod schemas without throwing errors
 *
 * @param schema the zod schema
 * @param data the data to parse against the schema
 * @returns the data if it matches the schema, otherwise returns undefined
 */
const parseData = <T extends z.ZodRawShape>(schema: z.ZodObject<T>, data: unknown) => {
	try {
		return schema.parse(data);
	} catch {
		/* throw away useless data */
	}
};

export default parseData;
