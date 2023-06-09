import { Center, Spinner, Text, chakra } from '@chakra-ui/react';
import { motion, type PanInfo } from 'framer-motion';
import { useMainContext } from '~/context/mainContext';
import { api } from '~/utils/api';
import MainCard from '../../components/MainCard';

const MainCategorys = () => {
	const { data: categorys, isLoading } = api.categorys.get.useQuery();
	const { dispatch, state } = useMainContext();

	const handlDrugEnd = (
		e: TouchEvent | MouseEvent | PointerEvent,
		info: PanInfo
	) => {
		if (info.offset.x > 100) {
			dispatch({
				type: 'SET_ALL',
				payload: {
					...state,
					subcat: false,
					cat: true,
				},
			});
		}
	};
	const Container = chakra(motion.div);
	if (isLoading)
		return (
			<Center>
				<Spinner size={'lg'} />
			</Center>
		);
	if (categorys?.length === 0 || !categorys)
		return <Text>Нет категорий</Text>;
	return (
		<Container
			gap={3}
			px={5}
			w="100vw"
			h="100%"
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					type: 'spring',
					duration: 1,
				},
			}}
			layout
			display="flex"
			justifyContent="center"
			flexWrap="wrap"
			flexDirection="row"
			drag={state.subcat ? 'x' : false}
			dragConstraints={{ right: 0, left: 0 }}
			dragElastic={0.8}
			onDragEnd={
				state.subcat || state.isProductSub ? handlDrugEnd : undefined
			}
			key={123}
		>
			{categorys.map((category, index) =>
				state.cat ? (
					<MainCard
						key={category.id}
						category={category}
						index={index}
						onClick={() => {
							if (category.subCategory.length === 0) {
								dispatch({
									type: 'SET_ALL',
									payload: {
										...state,
										cat: false,
										isProductCat: true,
										catId: category.id,
									},
								});
							} else {
								dispatch({
									type: 'SET_ALL',
									payload: {
										...state,
										cat: false,
										subcat: true,
										catId: category.id,
										isProductSub: true,
									},
								});
							}
						}}
					/>
				) : state.subcat ? (
					category.subCategory
						.filter((cat) => cat.categoryId === state.catId)
						.map((subCategory, index) => (
							<MainCard
								key={subCategory.id}
								category={subCategory}
								index={index}
								onClick={() => {
									dispatch({
										type: 'SET_ALL',
										payload: {
											...state,
											subcat: false,
											isProductSub: true,
											subcatId: subCategory.id,
										},
									});
								}}
							/>
						))
				) : state.isProductSub ? (
					category.subCategory
						.filter((subcat) => subcat.id === state.subcatId)
						.map((subCategory, index) => {
							return subCategory.product.map((product) => (
								<MainCard
									key={product.id}
									product={product}
									index={index}
									onClick={() => {
										console.log('prod');
									}}
								/>
							));
						})
				) : state.isProductCat ? (
					category.product.map((product, index) => (
						<MainCard
							key={product.categoryTitle}
							index={index}
							product={product}
							onClick={() => {
								console.log('prod');
							}}
						/>
					))
				) : null
			)}
		</Container>
	);
};

export default MainCategorys;
