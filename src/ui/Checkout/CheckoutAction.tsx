import {
	Button,
	ButtonGroup,
	Icon,
	IconButton,
	Stack,
	Text,
} from '@chakra-ui/react';
import { MdArrowBackIos } from 'react-icons/md';
import { useMainContext } from '~/context/mainContext';

const CheckoutAction = () => {
	const { dispatch, state } = useMainContext();
	return (
		<Stack
			position="fixed"
			bottom={5}
			w="100%"
			alignItems="center"
			justifyContent="center"
		>
			{!state.isCheckout && (
				<Text fontWeight={600}>Итог: {state.products.totalSum} ₽</Text>
			)}
			{!state.isCheckout && (
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
					colorScheme={'telegram'}
					w="90%"
					size="lg"
				>
					К оплате
				</Button>
			)}
			{state.isCheckout && (
				<ButtonGroup isAttached size="lg" colorScheme="green" w="90%">
					<Button w="90%" borderRight="1px">
						Оплатить
					</Button>
					<IconButton
						aria-label="back"
						onClick={() => {
							dispatch({
								type: 'SET_ALL',
								payload: {
									...state,
									isCheckout: false,
									email: '',
									cat: true,
								},
							});
						}}
						icon={<Icon as={MdArrowBackIos} />}
					/>
				</ButtonGroup>
			)}
		</Stack>
	);
};

export default CheckoutAction;
