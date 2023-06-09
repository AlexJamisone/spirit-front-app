import { ChakraProvider } from '@chakra-ui/react';
import { ClerkProvider } from '@clerk/nextjs';
import { type AppType } from 'next/app';
import { theme } from '~/chakra/theme';
import { ruRU } from '~/localization/ru';
import { api } from '~/utils/api';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<ClerkProvider {...pageProps} localization={ruRU}>
				<Component {...pageProps} />
			</ClerkProvider>
		</ChakraProvider>
	);
};

export default api.withTRPC(MyApp);
