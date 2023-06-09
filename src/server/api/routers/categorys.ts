import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const categorysRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.category.findMany({
			include: {
				subCategory: {
					include: {
						product: true,
					},
				},
				product: {
					include: {
						category: true,
						subCategory: true,
					},
				},
			},
		});
	}),
});
