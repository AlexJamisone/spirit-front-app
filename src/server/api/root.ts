import { categorysRouter } from '~/server/api/routers/categorys';
import { createTRPCRouter } from '~/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	categorys: categorysRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
