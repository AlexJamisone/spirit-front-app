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
	}),
});
