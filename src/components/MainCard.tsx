import { Card, CardBody } from '@chakra-ui/react';
import type { Category, Product, SubCategory } from '@prisma/client';
import { motion } from 'framer-motion';

type MainCardProps = {
	category?: Category | SubCategory;
	product?: Product;
	index: number;
	onClick: () => void;
};

const MainCard = ({ category, index, onClick, product }: MainCardProps) => {
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
			>
				<CardBody fontWeight={600}>
					{category?.title || product?.name}
				</CardBody>
			</Card>
		</>
	);
};

export default MainCard;
