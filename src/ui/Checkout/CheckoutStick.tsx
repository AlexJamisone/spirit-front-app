import { Icon, IconButton, Stack, Tag, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useMainContext } from '~/context/mainContext';
import type { ProductItems } from '~/recducer/controlReducer';

type CheckoutStickProps = {
	product: ProductItems;
	index: number;
};

const CheckoutStick = ({ product, index }: CheckoutStickProps) => {
	const { dispatch } = useMainContext();
	const { id, name, price, quantity, size, qtId } = product;
	const handlButton = (operation: 'plus' | 'minus') => {
		return (
			<IconButton
				size="sm"
				variant="ghost"
				aria-label={operation}
				icon={
					<Icon
						as={operation === 'plus' ? GrFormNext : GrFormPrevious}
					/>
				}
				onClick={() => {
					if (quantity === 1 && operation === 'minus') {
						dispatch({
							type: 'REMOVE_PRODUCT',
							payload: {
								id,
							},
						});
					} else {
						dispatch({
							type: 'SET_PRODUCT_UPDATE',
							payload: {
								id,
								name,
								price,
								quantity:
									operation === 'plus'
										? quantity + 1
										: quantity - 1,
								size,
								qtId,
							},
						});
					}
				}}
			/>
		);
	};
	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			fontWeight={400}
			alignItems="center"
			as={motion.div}
			initial={{ opacity: 0 }}
			whileInView={{
				opacity: 1,
				transition: {
					type: 'spring',
					duration: 0.9 * index,
					delay: 0.2,
				},
			}}
			exit={{
				opacity: 0,
			}}
		>
			<Text fontSize="small">{name}</Text>
			<Stack direction="row" alignItems="center">
				{handlButton('minus')}
				<Text>{quantity}</Text>
				{handlButton('plus')}
			</Stack>
			<Tag>{size}</Tag>
			<Text>{price} ₽</Text>
		</Stack>
	);
};

export default CheckoutStick;
