import {
	Card,
	CardBody,
	CardHeader,
	Icon,
	IconButton,
	Stack,
	Text,
} from '@chakra-ui/react';
import type {
	Category,
	Product,
	ProductPriceHistory,
	Quantity,
	Size,
	SubCategory,
} from '@prisma/client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import { useMainContext } from '~/context/mainContext';
import InSelectItem from '~/ui/Main/InSelectItem';

type MainCardProps = {
	category?: Category | SubCategory;
	product?: Product & {
		priceHistory: ProductPriceHistory[];
		quantity: (Quantity & {
			size: Size;
		})[];
	};
	onClick: () => void;
};

const MainCard = ({ category, onClick, product }: MainCardProps) => {
	const { state, dispatch } = useMainContext();
	const isInCart = state.products.items.some(
		(item) => item.id === product?.id
	);
	return (
		<Card
			size="sm"
			p={5}
			rounded="3xl"
			cursor="pointer"
			as={motion.div}
			boxShadow="2xl"
			initial={{ opacity: 0, y: -50, x: -50 }}
			animate={{
				opacity: 1,
				y: 0,
				x: 0,
				transition: {
					type: 'spring',
					duration: 0.3,
				},
			}}
			onClick={onClick}
			position="relative"
		>
			{product ? (
				<Stack position="absolute" top={3} right={1} left={1}>
					{state.products.items.map((inCartItems, index) =>
						product.id === inCartItems.id ? (
							<Stack
								key={index}
								gap={5}
								position="relative"
								w="100%"
								justifyContent="center"
							>
								<InSelectItem inCartItems={inCartItems} />
							</Stack>
						) : null
					)}
				</Stack>
			) : null}
			{product ? (
				<CardHeader mx="auto" my={0}>
					<Image
						width={80}
						height={50}
						alt={product.name}
						src={`${process.env.NEXT_PUBLIC_IMAGE_URL as string}${
							product.image[0] as string
						}`}
					/>
				</CardHeader>
			) : null}
			<CardBody fontWeight={600} fontSize="sm" textAlign="center">
				<Stack direction="column">
					<Text>{category?.title || product?.name}</Text>
					{product ? (
						<>
							<Text>
								{
									product.priceHistory[0]?.price.toString() as string
								}{' '}
								₽
							</Text>
						</>
					) : null}
				</Stack>
			</CardBody>
			{isInCart && (
				<IconButton
					aria-label="clear"
					colorScheme="red"
					icon={<Icon as={MdDelete} boxSize={4} />}
					size="xs"
					position="absolute"
					bottom={3}
					right={3}
					onClick={(e) => {
						dispatch({
							type: 'REMOVE_PRODUCT',
							payload: {
								id: product?.id as string,
							},
						});
						e.stopPropagation();
					}}
				/>
			)}
		</Card>
	);
};

export default MainCard;
