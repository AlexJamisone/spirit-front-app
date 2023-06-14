import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const subcatRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.subCategory.findMany();
	}),
});
