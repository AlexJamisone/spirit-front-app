import { Card, CardBody, CardHeader, Stack, Text } from '@chakra-ui/react';
import type {
	Category,
	Product,
	ProductPriceHistory,
	Size,
	SubCategory,
} from '@prisma/client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMainContext } from '~/context/mainContext';
import SizeModal from '~/ui/Main/SizeModal';

type MainCardProps = {
	category?: Category | SubCategory;
	product?: Product & {
		priceHistory: ProductPriceHistory[];
		size: Size[];
	};
	index: number;
	onClick: () => void;
};

const MainCard = ({ category, index, onClick, product }: MainCardProps) => {
	const { state } = useMainContext();

	return (
		<>
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
						delay: 0.2 * index,
						duration: 0.3,
					},
				}}
				onClick={onClick}
				position="relative"
			>
				{product ? (
					<>
						{state.products.map(
							({ quantity, size, sizeId }, index) => (
								<Stack
									key={sizeId}
									direction={'row'}
									justifyContent="space-between"
								>
									<Text
										position="absolute"
										fontSize="smaller"
										left={0.5}
										mt={3}
										top={7 * index}
										bgColor="telegram.200"
										textAlign="center"
										rounded={'full'}
										px={1}
									>
										{size}
									</Text>
									<Text
										position="absolute"
										right={1}
										mt={3}
										top={7 * index}
										bgColor="telegram.200"
										textAlign="center"
										rounded={'full'}
										w={5}
										fontSize="smaller"
									>
										{quantity}
									</Text>
								</Stack>
							)
						)}
						<CardHeader mx="auto" my={0}>
							<Image
								width={80}
								height={50}
								alt={product.name}
								src={`${
									process.env.NEXT_PUBLIC_IMAGE_URL as string
								}${product.image[0] as string}`}
							/>
						</CardHeader>
					</>
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
								<SizeModal
									size={product.size}
									product={product}
								/>
							</>
						) : null}
					</Stack>
				</CardBody>
			</Card>
		</>
	);
};

export default MainCard;
