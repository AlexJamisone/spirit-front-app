import { Center, Spinner, Text, chakra } from '@chakra-ui/react';
import { motion, type PanInfo } from 'framer-motion';
import React from 'react';
import { useMainContext } from '~/context/mainContext';
import { api } from '~/utils/api';
import MainCard from '../../components/MainCard';
import SizeModal from '../../components/SizeModal';

const MainCategorys = () => {
	const { data: categorys, isLoading } = api.categorys.get.useQuery();
	const { dispatch, state } = useMainContext();
	const handlDrugEnd = (
		e: TouchEvent | MouseEvent | PointerEvent,
		info: PanInfo
	) => {
		if (info.offset.x > 100) {
			if (state.isProductCat) {
				dispatch({
					type: 'SET_ALL',
					payload: {
						...state,
						isProductCat: false,
						cat: true,
					},
				});
			} else {
				dispatch({
					type: 'SET_ALL',
					payload: {
						...state,
						subcat: false,
						cat: true,
						isProductSub: false,
					},
				});
			}
		}
	};
	const Container = chakra(motion.div);
	if (isLoading)
		return (
			<Center>
				<Spinner size={'lg'} />
			</Center>
		);
	if (!categorys || categorys.length === 0) return <Text>Нет категорий</Text>;
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
			drag={
				state.subcat || state.isProductCat || state.isProductSub
					? 'x'
					: false
			}
			dragConstraints={{ right: 0, left: 0 }}
			dragElastic={0.8}
			onDragEnd={
				state.subcat || state.isProductSub || state.isProductCat
					? handlDrugEnd
					: undefined
			}
		>
			{categorys.map((category) =>
				state.cat ? (
					<MainCard
						key={category.id}
						category={category}
						product={undefined}
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
						.map((subCategory) => (
							<MainCard
								key={subCategory.id}
								category={subCategory}
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
						.map((subCategory) => {
							return subCategory.product.map((product) => (
								<React.Fragment key={product.id}>
									<MainCard
										product={product}
										onClick={() => {
											dispatch({
												type: 'SET_SELECT_SIZE',
												payload: {
													productId: product.id,
													selectSize: true,
												},
											});
										}}
									/>
									<SizeModal
										quantity={product.quantity}
										product={product}
									/>
								</React.Fragment>
							));
						})
				) : state.isProductCat ? (
					category.product.map((product) => (
						<React.Fragment key={product.id}>
							<MainCard
								key={product.id}
								product={product}
								onClick={() => {
									dispatch({
										type: 'SET_SELECT_SIZE',
										payload: {
											productId: product.id,
											selectSize: true,
										},
									});
								}}
							/>
							<SizeModal
								quantity={product.quantity}
								product={product}
							/>
						</React.Fragment>
					))
				) : null
			)}
		</Container>
	);
};

export default MainCategorys;
