import { categorysRouter } from '~/server/api/routers/categorys';
import { createTRPCRouter } from '~/server/api/trpc';
import { checksRouter } from './routers/cheks';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	categorys: categorysRouter,
	checks: checksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
