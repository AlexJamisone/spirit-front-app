import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	Tooltip,
} from '@chakra-ui/react';
import type {
	Product,
	ProductPriceHistory,
	Quantity,
	Size,
} from '@prisma/client';
import { useMainContext } from '~/context/mainContext';

type SizeModalProps = {
	quantity: (Quantity & {
		size: Size;
	})[];
	product: Product & {
		priceHistory: ProductPriceHistory[];
	};
};

const SizeModal = ({ quantity, product }: SizeModalProps) => {
	const { controls, dispatchCtrl, dispatchItems } = useMainContext();
	const { control } = controls;
	return (
		<Modal
			isOpen={
				control.sizeControl.selectSize &&
				control.sizeControl.productId === product.id
			}
			onClose={() => {
				dispatchCtrl({
					type: 'SET_CTRL',
					payload: {
						...control,
						sizeControl: {
							selectSize: false,
							productId: '',
						},
					},
				});
			}}
			size="xs"
			closeOnEsc={false}
			closeOnOverlayClick={false}
			isCentered
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="center" fontSize="md">
					Выбери размер
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack
						direction="row"
						flexWrap="wrap"
						gap={9}
						justifyContent="center"
						alignItems="center"
						mb={7}
					>
						{quantity
							.sort((a, b) =>
								a.size.size.localeCompare(
									b.size.size,
									undefined,
									{
										numeric: true,
									}
								)
							)
							.map(({ value, id, size }) => (
								<Tooltip
									m={0}
									key={id}
									label={
										value <= 0 ? (
											<Text fontSize="xx-small">
												Под заказ
											</Text>
										) : (
											value
										)
									}
									isOpen={value <= 0 ? true : false}
									arrowPadding={2}
								>
									<Button
										border={
											value <= 0 ? '2px solid' : undefined
										}
										borderColor={
											value <= 0
												? 'blackAlpha.700'
												: undefined
										}
										size="sm"
										onClick={() => {
											dispatchItems({
												type: 'SET_ADD',
												payload: {
													qtId: id,
													id: product.id,
													quantity: 1,
													size: size.size,
													price: product
														.priceHistory[0]
														?.price as number,
													name: product.name,
												},
											});
											dispatchCtrl({
												type: 'SET_CTRL',
												payload: {
													...control,
													sizeControl: {
														selectSize: false,
														productId: '',
													},
												},
											});
										}}
									>
										{size.size}
									</Button>
								</Tooltip>
							))}
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default SizeModal;
