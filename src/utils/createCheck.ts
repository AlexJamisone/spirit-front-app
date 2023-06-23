import dayjs from 'dayjs';
import { getToken } from './getToken';

export const createCheck = async (
	products: { name: string; quantity: number; amount: number }[],
	totalAmount: number
): Promise<{ approvedReceiptUuid: string }> => {
	try {
		const { token } = await getToken();
		const req = await fetch('https://lknpd.nalog.ru/api/v1/income', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				paymentType: 'CASH',
				services: products,
				ignoreMaxTotalIncomeRestriction: false,
				client: {
					contactPhone: null,
					displayName: null,
					incomeType: 'FROM_INDIVIDUAL',
					inn: null,
				},
				totalAmount: totalAmount,
				requestTime: dayjs().toDate(),
				operationTime: dayjs().toDate(),
			}),
		});
		const data = (await req.json()) as { approvedReceiptUuid: string };
		return {
			approvedReceiptUuid: data.approvedReceiptUuid,
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
};
