import type { z } from 'zod';

const parseData = <T extends z.ZodRawShape>(schema: z.ZodObject<T>, data: unknown) => {
	try {
		return schema.parse(data);
	} catch {
		/* empty */
	}
};

export default parseData;
