import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Icon,
	Stack,
	Tag,
	Text,
	useToast,
} from '@chakra-ui/react';
import type { Check, CheckContent, CheckStatus } from '@prisma/client';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { api } from '~/utils/api';
dayjs.locale('ru');

type CheckCardProps = {
	check: Check & {
		content: CheckContent[];
	};
};

const ChecksCard = ({ check }: CheckCardProps) => {
	const { mutate: changeStatus, isLoading } =
		api.checks.changeStatus.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const handlIcon = (status: CheckStatus) => {
		return (
			<Icon
				position="absolute"
				top={1}
				left={3}
				as={status === 'COMPLETED' ? BsFillCheckCircleFill : MdCancel}
				fill={status === 'COMPLETED' ? 'green.400' : 'red.400'}
				boxSize={5}
			/>
		);
	};
	const handlCancel = () => {
		changeStatus(
			{
				idCheck: check.id,
				products: check.content.map(({ qtId, quantity }) => ({
					qtId,
					quantity,
				})),
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
		<Card w="100%" fontSize="small" position="relative">
			{handlIcon(check.status)}
			<CardBody
				as={Stack}
				direction="column"
				alignItems="center"
				justifyContent="space-between"
				gap={3}
			>
				<Stack direction="row">
					<Text fontWeight={600}>№ {check.checkNumber} от</Text>
					<Text>{dayjs(check.createdAt).format('DD.MM HH:mm')}</Text>
				</Stack>
				<Stack>
					{check.content.map(({ id, name, quantity, size }) => (
						<Stack
							key={id}
							fontSize="small"
							direction="row"
							justifyContent="center"
							alignItems="center"
						>
							<Text>
								{name.split(' ').length > 2
									? name.split(' ').slice(0, 2).join(' ')
									: name}
							</Text>
							<Tag size="sm">{size}</Tag>
							<Text>x {quantity}</Text>
						</Stack>
					))}
				</Stack>
				<Text fontSize="md" fontWeight={600}>
					{check.totalSum} ₽
				</Text>
			</CardBody>
			<Divider color="gray.400" />
			<CardFooter>
				<Button
					colorScheme="red"
					w="100%"
					isDisabled={check.status === 'CANCELLED'}
					onClick={handlCancel}
					isLoading={isLoading}
				>
					Отменить
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ChecksCard;
