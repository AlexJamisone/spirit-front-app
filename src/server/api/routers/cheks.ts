import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';
import { resend } from '~/server/resend';
import Email from '~/ui/Email/Email';
dayjs.locale('ru');

export const checksRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.check.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			where: {
				createdAt: {
					gte: dayjs().startOf('day').toDate(),
					lte: dayjs().endOf('day').toDate(),
				},
			},
			include: {
				content: true,
			},
		});
	}),
	changeStatus: adminProcedure
		.input(
			z.object({
				idCheck: z.string(),
				products: z.array(
					z.object({
						qtId: z.string(),
						quantity: z.number(),
					})
				),
			})
		)
		.mutation(async ({ ctx, input }) => {
			input.products.map(async ({ qtId, quantity }) => {
				return await ctx.prisma.quantity.update({
					where: {
						id: qtId,
					},
					data: {
						value: {
							increment: quantity,
						},
					},
				});
			});
			return await ctx.prisma.check.update({
				where: {
					id: input.idCheck,
				},
				data: {
					status: 'CANCELLED',
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
				({ name, price, quantity, size, qtId }) => ({
					name,
					price,
					quantity,
					size,
					qtId,
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
	getRevenue: adminProcedure.output(z.number()).query(async ({ ctx }) => {
		const checks = await ctx.prisma.check.findMany({
			where: {
				createdAt: {
					gte: dayjs().startOf('day').toDate(),
					lte: dayjs().endOf('day').toDate(),
				},
				NOT: {
					status: 'CANCELLED',
				},
			},
		});
		const sum: number = checks.reduce(
			(acc, current) => acc + current.totalSum,
			0
		);
		return sum;
	}),
});
