import { Spinner, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { api } from '~/utils/api';
import MainCategorysCard from './MainCategorysCard';

const MainCategorys = () => {
	const { data: categorys, isLoading } = api.categorys.get.useQuery();
	if (isLoading) return <Spinner size="lg" />;
	if (categorys?.length === 0 || !categorys)
		return <Text>Нет категорий</Text>;
	return (
		<Stack
			direction="row"
			gap={3}
			mx={5}
			as={motion.div}
			layout
			justifyContent="center"
		>
			{categorys.map((category, index) => (
				<MainCategorysCard
					key={category.id}
					category={category}
					index={index}
				/>
			))}
		</Stack>
	);
};

export default MainCategorys;
