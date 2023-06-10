import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const categorysRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.category.findMany({
			include: {
				subCategory: {
					include: {
						product: {
							include: {
								priceHistory: true,
								size: true,
							},
						},
					},
				},
				product: {
					include: {
						category: true,
						subCategory: true,
						priceHistory: true,
						size: true,
					},
				},
			},
		});
	}),
});
