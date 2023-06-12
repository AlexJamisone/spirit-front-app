import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const categorysRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		const categorys = await ctx.prisma.category.findMany({
			include: {
				subCategory: true,
			},
		});
		const subCategory = await ctx.prisma.subCategory.findMany({
			include: {
				category: true,
			},
		});
		const products = await ctx.prisma.product.findMany({
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
				subCategory: true,
				category: true,
			},
		});
		return {
			categorys,
			subCategory,
			products,
		};
	}),
});
