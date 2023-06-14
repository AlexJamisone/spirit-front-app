import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const categorysRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		const categorys = await ctx.prisma.category.findMany({
			include: {
				subCategory: true,
			},
		});

		return categorys.map((cat) => ({
			...cat,
			subCategory: cat.subCategory.length,
		}));
		// const cat = ctx.prisma.category.findMany({
		// 	include: {
		// 		subCategory: true,
		// 	},
		// });
		// const subcat = ctx.prisma.subCategory.findMany({
		// 	include: {
		// 		category: true,
		// 	},
		// });
		// const prod = ctx.prisma.product.findMany({
		// 	include: {
		// 		priceHistory: {
		// 			orderBy: {
		// 				effectiveFrom: 'desc',
		// 			},
		// 		},
		// 		quantity: {
		// 			include: {
		// 				size: true,
		// 			},
		// 		},
		// 		subCategory: {
		// 			select: {
		// 				id: true,
		// 			},
		// 		},
		// 		category: {
		// 			select: {
		// 				id: true,
		// 			},
		// 		},
		// 	},
		// });
		// const [categorysFromDb, subCategory, products] = await Promise.all([
		// 	cat,
		// 	subcat,
		// 	prod,
		// ]);
		// const categorys = categorysFromDb.map((cat) => {
		// 	return {
		// 		...cat,
		// 		subCategory: cat.subCategory.length,
		// 	};
		// });
		// return {
		// 	categorys,
		// 	subCategory,
		// 	products,
		// };
	}),
});
