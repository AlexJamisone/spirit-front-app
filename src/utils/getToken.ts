import { env } from '~/env.mjs';

type TokenApi = {
	refreshToken: string;
	refreshTokenExpiresIn: string | null;
	token: string;
	tokenExpireIn: Date;
};

export const getToken = async (): Promise<TokenApi | undefined> => {
	try {
		const response = await fetch(
			'https://lknpd.nalog.ru/api/v1/auth/token',
			{
				method: 'POST',
				body: JSON.stringify({
					deviceInfo: {
						sourceDeviceId: '83T-v9XceXk9IiMnGOJAO',
						sourceType: 'WEB',
						appVersion: '1.0.0',
						metaDetails: {
							userAgent:
								'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
						},
					},
					refreshToken: env.TOKEN,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const date = (await response.json()) as TokenApi;
		return {
			...date,
			token: date.token,
		};
	} catch (error) {
		console.log(error);
	}
};
