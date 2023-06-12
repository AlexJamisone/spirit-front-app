import { Center, Spinner, Stack, Text, chakra } from '@chakra-ui/react';
import { motion, type PanInfo } from 'framer-motion';
import React, { useReducer } from 'react';
import SizeModal from '~/components/SizeModal';
import MainContext from '~/context/mainContext';
import { controlsReducer, initial } from '~/recducer/controlReducer';
import { api } from '~/utils/api';
import MainCard from '../../components/MainCard';
import Checkout from '../Checkout/Checkout';
import CheckoutAction from '../Checkout/CheckoutAction';
import Succsess from './Succsess';

const MainCategorys = () => {
	const { data: main, isLoading } = api.categorys.get.useQuery();
	const [state, dispatch] = useReducer(controlsReducer, initial);
	console.log(state);
	const handlDrugEnd = (
		e: TouchEvent | MouseEvent | PointerEvent,
		info: PanInfo
	) => {
		if (info.offset.x > 100) {
			if (state.isProductCat || state.isProductSub) {
				dispatch({
					type: 'SET_ALL',
					payload: {
						...state,
						isProductCat: false,
						isProductSub: false,
						cat: true,
						subcat: false,
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
						isCheckout: false,
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
	if (!main || main.categorys.length === 0) return <Text>Нет категорий</Text>;
	return (
		<MainContext.Provider
			value={{
				dispatch,
				state,
			}}
		>
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
				display="flex"
				justifyContent="center"
				flexWrap="wrap"
				flexDirection="row"
				drag={
					state.subcat ||
					state.isProductCat ||
					state.isProductSub ||
					state.isCheckout
						? 'x'
						: false
				}
				dragConstraints={{ right: 0, left: 0 }}
				dragElastic={0.8}
				onDragEnd={
					state.subcat ||
					state.isProductSub ||
					state.isProductCat ||
					state.isCheckout
						? handlDrugEnd
						: undefined
				}
			>
				{state.cat &&
					main.categorys
						.filter((cat) => cat.id !== state.subcatId)
						.map((category) => (
							<MainCard
								key={category.id}
								category={category}
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
						))}
				{state.subcat &&
					main.subCategory
						.filter((subcat) => subcat.categoryId === state.catId)
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
						))}
				{state.isProductSub &&
					main.products
						.filter(
							(product) =>
								product.subCategory?.id === state.subcatId
						)
						.map((product) => (
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
						))}
				{state.isProductCat &&
					main.products
						.filter(
							(product) => product.category?.id === state.catId
						)
						.map((product) => (
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
									product={product}
									quantity={product.quantity}
								/>
							</React.Fragment>
						))}
			</Container>
			{state.success && <Succsess />}
			<Stack mx={5}>{state.isCheckout && <Checkout />}</Stack>
			{state.products.items.length !== 0 && !state.success && (
				<CheckoutAction />
			)}
		</MainContext.Provider>
	);
};

export default MainCategorys;
