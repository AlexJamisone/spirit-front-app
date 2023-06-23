import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { getToken } from './getToken';
dayjs.locale('ru');

export const cancelCheck = async (receiptUuid: string): Promise<void> => {
	try {
		const { token } = await getToken();
		const response = await fetch('https://lknpd.nalog.ru/api/v1/cancel', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				receiptUuid,
				comment: 'Чек сформирован ошибочно',
				operationTime: dayjs().toDate(),
				requestTime: dayjs().toDate(),
				partnerCode: null,
			}),
		});
		return (await response.json()) as void;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
