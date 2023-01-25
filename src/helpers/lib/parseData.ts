import type { z } from 'zod';

const parseData = <T extends z.ZodRawShape>(schema: z.ZodObject<T>, data: unknown) => {
	try {
		return schema.parse(data);
	} catch {
		/* throw away useless data */
	}
};

export default parseData;
