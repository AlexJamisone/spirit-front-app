import { Card, CardBody } from '@chakra-ui/react';
import type { Category } from '@prisma/client';
import { motion } from 'framer-motion';

type MainCategorysCardProps = {
	category: Category;
	index: number;
};

const MainCategorysCard = ({ category, index }: MainCategorysCardProps) => {
	return (
		<Card
			size="sm"
			p={5}
			rounded="3xl"
			cursor="pointer"
			as={motion.div}
			boxShadow="2xl"
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					type: 'spring',
					delay: 1 * index,
					duration: 0.3,
				},
			}}
		>
			<CardBody fontWeight={600}>{category.title}</CardBody>
		</Card>
	);
};

export default MainCategorysCard;
