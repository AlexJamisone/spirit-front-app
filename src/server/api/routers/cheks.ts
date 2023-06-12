import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';
import { resend } from '~/server/resend';
import Email from '~/ui/Email/Email';

export const checksRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.check.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				content: true,
			},
		});
	}),
	create: adminProcedure
		.input(
			z.object({
				totalSum: z.number().nonnegative().int(),
				items: z.array(
					z.object({
						id: z.string(),
						qtId: z.string(),
						quantity: z.number(),
						size: z.string(),
						price: z.number(),
						name: z.string(),
					})
				),
				check: z.boolean(),
				email: z.string().optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (input.check && input.email) {
				//create here check for nalog
				const src = 'https://placehold.co/600x400';
				await resend.sendEmail({
					from: 'bounced@spirit-home.ru',
					to: input.email,
					subject: 'Чек',
					react: Email({ src }),
				});
			}
			input.items.map(async (prod) => {
				return await ctx.prisma.quantity.update({
					where: {
						id: prod.qtId,
					},
					data: {
						value: {
							decrement: prod.quantity,
						},
					},
				});
			});
			const check = input.items.map(
				({ name, price, quantity, size }) => ({
					name,
					price,
					quantity,
					size,
				})
			);
			return await ctx.prisma.check.create({
				data: {
					totalSum: input.totalSum,
					content: {
						createMany: {
							data: check,
						},
					},
				},
			});
		}),
});