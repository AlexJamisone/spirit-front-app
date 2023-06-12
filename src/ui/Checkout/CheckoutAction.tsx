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
import { api } from '~/utils/api';

const CheckoutAction = () => {
	const { dispatch, state } = useMainContext();
	const { mutate: pay, isLoading } = api.checks.create.useMutation();
	const ctx = api.useContext();
	const handlPay = () => {
		pay(
			{
				check: state.check,
				items: state.products.items,
				totalSum: state.products.totalSum,
				email: state.email,
			},
			{
				onSuccess: () => {
					void ctx.checks.invalidate();
					dispatch({
						type: 'SET_ALL',
						payload: {
							...state,
							cat: false,
							catId: '',
							check: false,
							email: '',
							isCheckout: false,
							isProductCat: false,
							isProductSub: false,
							sizeControl: {
								productId: '',
								selectSize: false,
							},
							subcat: false,
							subcatId: '',
							success: true,
						},
					});
				},
			}
		);
	};
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
					<Button
						isLoading={isLoading}
						onClick={handlPay}
						w="90%"
						borderRight="1px"
					>
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
