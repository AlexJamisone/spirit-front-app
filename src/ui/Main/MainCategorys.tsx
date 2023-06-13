import { Center, Spinner, Text, chakra } from '@chakra-ui/react';
import { motion, type PanInfo } from 'framer-motion';
import React from 'react';
import SizeModal from '~/components/SizeModal';
import { useMainContext } from '~/context/mainContext';
import { api } from '~/utils/api';
import MainCard from '../../components/MainCard';

const MainCategorys = () => {
	const { data: main, isLoading } = api.categorys.get.useQuery();
	const { controls, dispatchCtrl } = useMainContext();
	const { control } = controls;
	const handlDrugEnd = (
		e: TouchEvent | MouseEvent | PointerEvent,
		info: PanInfo
	) => {
		if (info.offset.x > 100) {
			if (control.isProductCat || control.isProductSub) {
				dispatchCtrl({
					type: 'SET_CTRL',
					payload: {
						...control,
						isProductCat: false,
						isProductSub: false,
						cat: true,
						subcat: false,
					},
				});
			} else {
				dispatchCtrl({
					type: 'SET_CTRL',
					payload: {
						...control,
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
				control.subcat ||
				control.isProductCat ||
				control.isProductSub ||
				control.isCheckout
					? 'x'
					: false
			}
			dragConstraints={{ right: 0, left: 0 }}
			dragElastic={0.8}
			onDragEnd={
				control.subcat ||
				control.isProductSub ||
				control.isProductCat ||
				control.isCheckout
					? handlDrugEnd
					: undefined
			}
		>
			{control.cat &&
				main.categorys
					.filter((cat) => cat.id !== controls.subcatId)
					.map((category) => (
						<MainCard
							key={category.id}
							category={category}
							onClick={() => {
								if (category.subCategory.length === 0) {
									dispatchCtrl({
										type: 'SET_ALL',
										payload: {
											...controls,
											control: {
												...control,
												cat: false,
												isProductCat: true,
											},
											catId: category.id,
										},
									});
								} else {
									dispatchCtrl({
										type: 'SET_ALL',
										payload: {
											...controls,
											control: {
												...control,
												cat: false,
												subcat: true,
											},
											catId: category.id,
										},
									});
								}
							}}
						/>
					))}
			{control.subcat &&
				main.subCategory
					.filter((subcat) => subcat.categoryId === controls.catId)
					.map((subCategory) => (
						<MainCard
							key={subCategory.id}
							category={subCategory}
							onClick={() => {
								dispatchCtrl({
									type: 'SET_ALL',
									payload: {
										...controls,
										control: {
											...control,
											subcat: false,
											isProductSub: true,
										},
										subcatId: subCategory.id,
									},
								});
							}}
						/>
					))}
			{control.isProductSub &&
				main.products
					.filter(
						(product) =>
							product.subCategory?.id === controls.subcatId
					)
					.map((product) => (
						<React.Fragment key={product.id}>
							<MainCard
								product={product}
								onClick={() => {
									dispatchCtrl({
										type: 'SET_CTRL',
										payload: {
											...control,
											sizeControl: {
												productId: product.id,
												selectSize: true,
											},
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
			{control.isProductCat &&
				main.products
					.filter(
						(product) => product.category?.id === controls.catId
					)
					.map((product) => (
						<React.Fragment key={product.id}>
							<MainCard
								product={product}
								onClick={() => {
									dispatchCtrl({
										type: 'SET_CTRL',
										payload: {
											...control,
											sizeControl: {
												productId: product.id,
												selectSize: true,
											},
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
	);
};

export default MainCategorys;
