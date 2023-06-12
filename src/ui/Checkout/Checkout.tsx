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
	const { state, dispatch } = useMainContext();

	return (
		<Stack gap={5} justifyContent="center">
			<AnimatePresence>
				{state.products.items.map((product, index) => (
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
				<Text>{state.products.totalSum} ₽</Text>
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
						dispatch({
							type: 'SET_CHECK',
							payload: e.target.checked,
						})
					}
					isChecked={state.check}
				/>
			</FormControl>
			{state.check && (
				<FormControl>
					<FormLabel>На какой email отправить?</FormLabel>
					<Input
						type="email"
						onChange={(e) =>
							dispatch({
								type: 'SET_EMAIL',
								payload: e.target.value,
							})
						}
						value={state.email}
					/>
				</FormControl>
			)}
		</Stack>
	);
};

export default Checkout;
