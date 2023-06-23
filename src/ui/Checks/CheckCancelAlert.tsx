import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Highlight,
	useToast,
} from '@chakra-ui/react';
import type { Check, CheckContent } from '@prisma/client';
import { useRef } from 'react';
import { api } from '~/utils/api';
type CheckCancelAlertProps = {
	isOpen: boolean;
	onClose: () => void;
	check: Check & {
		content: CheckContent[];
	};
};

const CheckCancelAlert = ({
	isOpen,
	onClose,
	check,
}: CheckCancelAlertProps) => {
	const { mutate: cancelCheck, isLoading } =
		api.checks.changeStatus.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const cancelRef = useRef<HTMLButtonElement | null>(null);
	const handlClick = () => {
		cancelCheck(
			{
				idCheck: check.id,
				products: check.content.map(({ qtId, quantity }) => ({
					qtId,
					quantity,
				})),
				receiptUuid: check.printId,
			},
			{
				onSuccess: () => {
					void ctx.checks.invalidate();
					toast({
						description: `Заказ №${check.checkNumber} успешно отменён`,
						position: 'top-right',
						status: 'success',
						isClosable: true,
					});
					onClose();
				},
				onError: ({ message }) => {
					toast({
						description: `${message}`,
						isClosable: true,
						status: 'error',
					});
				},
			}
		);
	};
	return (
		<AlertDialog
			isOpen={isOpen}
			onClose={onClose}
			leastDestructiveRef={cancelRef}
			isCentered
			motionPreset="slideInBottom"
			size={['sm', 'md']}
		>
			<AlertDialogOverlay />
			<AlertDialogContent>
				<AlertDialogHeader>Сделать возврат товара?</AlertDialogHeader>
				<AlertDialogBody textAlign="center">
					Если у товара был чек, он будет аннулирован!{' '}
					<Highlight
						query="возврат"
						styles={{ bg: 'red.300', rounded: '2xl', p: 1 }}
					>
						Потвердите возврат чек!
					</Highlight>
				</AlertDialogBody>
				<AlertDialogFooter gap={5}>
					<Button
						onClick={handlClick}
						isLoading={isLoading}
						colorScheme="telegram"
					>
						Потвердить
					</Button>
					<Button onClick={onClose} ref={cancelRef}>
						Отмена
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CheckCancelAlert;
