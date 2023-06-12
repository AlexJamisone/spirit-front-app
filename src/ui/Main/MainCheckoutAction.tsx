import { Button, Stack, Text } from '@chakra-ui/react';
import { useMainContext } from '~/context/mainContext';

const MainCheckoutAction = () => {
	const { dispatch, state } = useMainContext();
	return (
		<Stack position="fixed" bottom={5} w="100%" alignItems="center">
			{state.isCheckout ? null : (
				<Text fontWeight={600}>Итог: {state.products.totalSum} ₽</Text>
			)}
			<Button
				onClick={() => {
					dispatch({
						type: 'SET_ALL',
						payload: {
							...state,
							isCheckout: true,
							cat: false,
							isProductCat: false,
							isProductSub: false,
						},
					});
				}}
				colorScheme={state.isCheckout ? 'green' : 'telegram'}
				w="90%"
				size="lg"
			>
				{state.isCheckout ? 'Оплатить' : 'К Оплате'}
			</Button>
		</Stack>
	);
};

export default MainCheckoutAction;
