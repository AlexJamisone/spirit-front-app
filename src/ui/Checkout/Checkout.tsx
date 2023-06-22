import { Divider, Stack, Text } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMainContext } from '~/context/mainContext';
import CheckoutStick from './CheckoutStick';
import SendCheck from './SendCheck';

type CheckoutProps = {
	checkPrint?: ReactNode;
};

const Checkout = ({ checkPrint }: CheckoutProps) => {
	const { items } = useMainContext();
	const { products } = items;
	return (
		<Stack gap={5} justifyContent="center">
			<AnimatePresence>
				{products.items.map((product, index) => (
					<CheckoutStick
						index={index}
						product={product}
						key={product.qtId}
					/>
				))}
			</AnimatePresence>
			<Divider />
			<Stack
				direction="row"
				justifyContent="space-between"
				fontSize="large"
				fontWeight={600}
			>
				<Text>Итог: </Text>
				<Text>{products.totalSum} ₽</Text>
			</Stack>
			{checkPrint}
		</Stack>
	);
};

Checkout.SendCheck = SendCheck;

export default Checkout;
