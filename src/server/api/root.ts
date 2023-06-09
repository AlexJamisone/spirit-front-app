import { categorysRouter } from '~/server/api/routers/categorys';
import { createTRPCRouter } from '~/server/api/trpc';
import { checksRouter } from './routers/cheks';
import { productsRouter } from './routers/products';
import { subcatRouter } from './routers/subcat';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	categorys: categorysRouter,
	checks: checksRouter,
	products: productsRouter,
	subcat: subcatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
