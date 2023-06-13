import { Button, Stack, Text } from '@chakra-ui/react';
import { UserButton } from '@clerk/nextjs';
import { useReducer, type ReactNode } from 'react';
import AnimataedLayout from '~/components/AnimataedLayout';
import MainContext from '~/context/mainContext';
import { controlsReducer, initial } from '~/recducer/controlReducer';
import { initial as initialItems, itemReducer } from '~/recducer/itemReducere';
import Checkout from '../Checkout/Checkout';
import CheckoutAction from '../Checkout/CheckoutAction';
import Checks from '../Checks/Checks';
import Revenue from '../Revenue/Revenue';
import MainCategorys from './MainCategorys';
import Succsess from './Succsess';
type MainProps = {
	user?: ReactNode;
	categorys?: ReactNode;
	checks?: ReactNode;
};
const Main = ({ user, categorys, checks }: MainProps) => {
	const [controls, dispatchCtrl] = useReducer(controlsReducer, initial);
	const [items, dispatchItems] = useReducer(itemReducer, initialItems);
	const { control } = controls;
	return (
		<AnimataedLayout>
			<MainContext.Provider
				value={{
					controls,
					dispatchCtrl,
					dispatchItems,
					items,
				}}
			>
				<Stack w="100%">
					<Stack
						as="header"
						direction="row"
						justifyContent="space-between"
						m={5}
						alignItems="center"
					>
						<Stack direction="row" alignItems="center">
							<Text fontWeight={400} fontSize="lg">
								Выручка:
							</Text>
							<Revenue />
						</Stack>
						<Stack direction="row" gap={7}>
							<Button
								onClick={() => {
									dispatchCtrl({
										type: 'SET_CTRL',
										payload: {
											...control,
											checks: !control.checks,
											cat: control.checks ? true : false,
											checkNeed: false,
											isCheckout: false,
											isProductCat: false,
											isProductSub: false,
											sizeControl: {
												productId: '',
												selectSize: false,
											},
											subcat: false,
											success: false,
										},
									});
								}}
								colorScheme="telegram"
								size="sm"
							>
								{control.checks ? 'На главный' : 'Чеки'}
							</Button>
							{user}
						</Stack>
					</Stack>
					{categorys}
					{control.checks && checks}
					{control.success && <Succsess />}
					<Stack mx={5}>{control.isCheckout && <Checkout />}</Stack>
					{items.products.items.length !== 0 && !control.success && (
						<CheckoutAction />
					)}
				</Stack>
			</MainContext.Provider>
		</AnimataedLayout>
	);
};

Main.User = UserButton;
Main.Categorys = MainCategorys;
Main.Checks = Checks;

export default Main;
