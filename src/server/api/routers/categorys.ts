import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const categorysRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.category.findMany({
			include: {
				subCategory: {
					include: {
						product: {
							include: {
								priceHistory: {
									orderBy: {
										effectiveFrom: 'desc',
									},
								},
								quantity: {
									include: {
										size: true,
									},
								},
							},
						},
					},
				},
				product: {
					include: {
						category: true,
						subCategory: true,
						priceHistory: {
							orderBy: {
								effectiveFrom: 'desc',
							},
						},
						quantity: {
							include: {
								size: true,
							},
						},
					},
				},
			},
		});
	}),
});
