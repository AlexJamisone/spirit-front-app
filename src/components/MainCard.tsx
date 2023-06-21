import { Image } from '@chakra-ui/next-js';
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
	SubCategory,
} from '@prisma/client';
import { motion } from 'framer-motion';
import { MdDelete } from 'react-icons/md';
import { useMainContext } from '~/context/mainContext';
import { env } from '~/env.mjs';
import InSelectItem from '~/ui/Main/InSelectItem';

type MainCardProps = {
	category?: Category | SubCategory;
	product?: Product & {
		priceHistory: ProductPriceHistory[];
	};
	onClick: () => void;
};

const MainCard = ({ category, onClick, product }: MainCardProps) => {
	const { items, dispatchItems } = useMainContext();
	const { products } = items;
	const isInCart = products.items.some((item) => item.id === product?.id);
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
					{products.items.map((inCartItems, index) =>
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
						width={81}
						height={50}
						alt={product.name}
						src={`${env.NEXT_PUBLIC_UPLOADTHING_URL}${
							product.image[0] as string
						}`}
						quality={20}
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
						dispatchItems({
							type: 'DELET_ALL',
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
