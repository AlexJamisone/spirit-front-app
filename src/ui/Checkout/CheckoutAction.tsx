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
	const { items, controls, dispatchCtrl } = useMainContext();
	const { mutate: pay, isLoading } = api.checks.create.useMutation();
	const { products } = items;
	const { control } = controls;
	const ctx = api.useContext();
	const handlPay = () => {
		pay(
			{
				check: control.check,
				items: products.items,
				totalSum: products.totalSum,
				email: controls.email,
			},
			{
				onSuccess: () => {
					void ctx.checks.invalidate();
					dispatchCtrl({
						type: 'SET_ALL',
						payload: {
							control: {
								...control,
								check: false,
								isCheckout: false,
								success: true,
							},
							catId: '',
							email: '',
							subcatId: '',
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
			{!control.isCheckout && (
				<Text fontWeight={600}>Итог: {products.totalSum} ₽</Text>
			)}
			{!control.isCheckout && (
				<Button
					onClick={() => {
						dispatchCtrl({
							type: 'SET_CTRL',
							payload: {
								...control,
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
			{control.isCheckout && (
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
							dispatchCtrl({
								type: 'SET_ALL',
								payload: {
									...controls,
									control: {
										...control,
										isCheckout: false,
										cat: true,
									},
									email: '',
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
