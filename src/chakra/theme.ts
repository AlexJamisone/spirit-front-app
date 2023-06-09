import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const defultTheme: ThemeConfig = {
	initialColorMode: 'system',
	useSystemColorMode: true,
	disableTransitionOnChange: false,
};

export const theme = extendTheme({
	defultTheme,
});
