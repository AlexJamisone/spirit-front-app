import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
} from '@chakra-ui/react';
import type { Product, Size } from '@prisma/client';
import { useMainContext } from '~/context/mainContext';

type SizeModalProps = {
	size: Size[];
	product: Product;
};

const SizeModal = ({ size, product }: SizeModalProps) => {
	const { state, dispatch } = useMainContext();
	console.log(state);
	return (
		<Modal
			isOpen={state.selectSize}
			onClose={() => {
				dispatch({
					type: 'SET_SELECT_SIZE',
					payload: false,
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
						gap={3}
						justifyContent="center"
						mb={4}
					>
						{size.map(({ id, size }) => (
							<Button
								key={id}
								size="sm"
								onClick={() => {
									dispatch({
										type: 'SET_PRODUCT_ADD',
										payload: {
											sizeId: id,
											id: product.id,
											quantity: 1,
											size,
										},
									});
									dispatch({
										type: 'SET_SELECT_SIZE',
										payload: false,
									});
								}}
							>
								{size}
							</Button>
						))}
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default SizeModal;
