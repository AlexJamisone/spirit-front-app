import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const productsRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.product.findMany({
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
				subCategory: {
					select: {
						id: true,
					},
				},
				category: {
					select: {
						id: true,
					},
				},
			},
		});
	}),
});
