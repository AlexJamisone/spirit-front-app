import {
	Divider,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Switch,
	Text,
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useMainContext } from '~/context/mainContext';
import CheckoutStick from './CheckoutStick';

const Checkout = () => {
	const { controls, items, dispatchCtrl } = useMainContext();
	const [{ control }, { products }] = [controls, items];
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
			<FormControl
				as={Stack}
				direction="row"
				alignItems="center"
				justifyContent="space-between"
			>
				<FormLabel htmlFor="check">Нужен чек?</FormLabel>
				<Switch
					id="check"
					onChange={(e) =>
						dispatchCtrl({
							type: 'SET_CTRL',
							payload: {
								...control,
								check: e.target.checked,
							},
						})
					}
					isChecked={control.check}
				/>
			</FormControl>
			{control.check && (
				<FormControl>
					<FormLabel>На какой email отправить?</FormLabel>
					<Input
						type="email"
						onChange={(e) =>
							dispatchCtrl({
								type: 'SET_EMAIL',
								payload: e.target.value,
							})
						}
						value={controls.email}
					/>
				</FormControl>
			)}
		</Stack>
	);
};

export default Checkout;
