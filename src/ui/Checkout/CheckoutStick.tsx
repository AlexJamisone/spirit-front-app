import { Icon, IconButton, Stack, Tag, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useMainContext } from '~/context/mainContext';
import type { ProductItems } from '~/recducer/itemReducere';

type CheckoutStickProps = {
	product: ProductItems;
	index: number;
	delay?: number;
};

const CheckoutStick = ({ product, index, delay }: CheckoutStickProps) => {
	const { controls, dispatchItems } = useMainContext();
	const { control } = controls;
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
						dispatchItems({
							type: 'DELET_ONE',
							payload: {
								id,
								qtId,
							},
						});
					} else {
						dispatchItems({
							type: 'SET_UPDATE',
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
					delay: delay ?? 0.2,
				},
			}}
			exit={{
				opacity: 0,
			}}
		>
			<Text fontSize="small">{name}</Text>
			<Stack direction="row" alignItems="center">
				{!control.success && handlButton('minus')}
				<Text>
					{control.success && 'x'}
					{quantity}
				</Text>
				{!control.success && handlButton('plus')}
			</Stack>
			<Tag>{size}</Tag>
			<Text>{price} ₽</Text>
		</Stack>
	);
};

export default CheckoutStick;
