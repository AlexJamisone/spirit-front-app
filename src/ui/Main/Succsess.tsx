import { Button, Icon, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import AnimataedLayout from '~/components/AnimataedLayout';
import { useMainContext } from '~/context/mainContext';
import CheckoutStick from '../Checkout/CheckoutStick';
const Succsess = () => {
	const { items, dispatchCtrl, dispatchItems } = useMainContext();
	const { products } = items;
	return (
		<AnimataedLayout
			container={{
				h: '50vh',
				w: '100vw',
			}}
		>
			<Stack alignItems="center" gap={3}>
				<Icon as={FaCheckCircle} fontSize={150} color="green.400" />
				<Text
					as={motion.p}
					initial={{ opacity: 0, filter: 'blur(10px)', y: -50 }}
					animate={{
						opacity: 1,
						filter: 'blur(0px)',
						y: 0,
						transition: {
							delay: 1,
							duration: 0.5,
						},
					}}
					fontSize="2xl"
					fontWeight={600}
					textColor="blackAlpha.700"
				>
					Успешно оплачено!
				</Text>
				<Stack>
					{products.items.map((product, index) => (
						<CheckoutStick
							key={product.id}
							product={product}
							index={index}
							delay={1}
						/>
					))}
				</Stack>
				<Text
					fontWeight={600}
					textColor="blackAlpha.700"
					fontSize="2xl"
				>
					{products.totalSum} ₽
				</Text>
				<Button
					position="fixed"
					size="lg"
					w="90%"
					bottom={6}
					as={motion.button}
					initial={{ opacity: 0, y: 50 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: {
							type: 'spring',
							duration: 0.5,
							delay: 1.2,
						},
					}}
					colorScheme="linkedin"
					onClick={() => {
						dispatchCtrl({ type: 'INITIAL' });
						dispatchItems({
							type: 'INITIAL',
							payload: {
								products: {
									items: [],
									totalSum: 0,
								},
							},
						});
					}}
				>
					На главный экран
				</Button>
			</Stack>
		</AnimataedLayout>
	);
};

export default Succsess;
