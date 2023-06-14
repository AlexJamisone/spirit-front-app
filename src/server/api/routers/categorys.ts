import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const categorysRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		const cat = ctx.prisma.category.findMany({
			include: {
				subCategory: true,
			},
		});
		const subcat = ctx.prisma.subCategory.findMany({
			include: {
				category: true,
			},
		});
		const prod = ctx.prisma.product.findMany({
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
		const [categorysFromDb, subCategory, products] = await Promise.all([
			cat,
			subcat,
			prod,
		]);
		const categorys = categorysFromDb.map((cat) => {
			return {
				...cat,
				subCategory: cat.subCategory.length,
			};
		});
		return {
			categorys,
			subCategory,
			products,
		};
	}),
});
