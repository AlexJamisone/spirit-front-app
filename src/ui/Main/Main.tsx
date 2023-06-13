import { Stack, Text } from '@chakra-ui/react';
import { UserButton } from '@clerk/nextjs';
import { useReducer, type ReactNode } from 'react';
import AnimataedLayout from '~/components/AnimataedLayout';
import MainContext from '~/context/mainContext';
import { controlsReducer, initial } from '~/recducer/controlReducer';
import { initial as initialItems, itemReducer } from '~/recducer/itemReducere';
import Checkout from '../Checkout/Checkout';
import CheckoutAction from '../Checkout/CheckoutAction';
import MainCategorys from './MainCategorys';
import Succsess from './Succsess';
type MainProps = {
	user?: ReactNode;
	categorys?: ReactNode;
};
const Main = ({ user, categorys }: MainProps) => {
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
					>
						<Text>Выручка за сегодня</Text>
						{user}
					</Stack>
					{categorys}
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

export default Main;
