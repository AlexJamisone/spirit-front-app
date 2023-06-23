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
	useDisclosure,
} from '@chakra-ui/react';
import type { Check, CheckContent, CheckStatus } from '@prisma/client';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import CheckCancelAlert from './CheckCancelAlert';
dayjs.locale('ru');

type CheckCardProps = {
	check: Check & {
		content: CheckContent[];
	};
};

const ChecksCard = ({ check }: CheckCardProps) => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const handlIcon = (status: CheckStatus) => {
		return (
			<Icon
				position="absolute"
				top={5}
				left={2}
				as={status === 'COMPLETED' ? BsFillCheckCircleFill : MdCancel}
				fill={status === 'COMPLETED' ? 'green.400' : 'red.400'}
				boxSize={5}
			/>
		);
	};
	return (
		<Card fontSize="small" position="relative">
			{handlIcon(check.status)}
			<CardBody
				as={Stack}
				direction="column"
				alignItems="center"
				justifyContent="space-between"
				gap={3}
				w="90vw"
			>
				<Stack direction="row" textAlign="left" w="100%" ml={8}>
					<Text fontWeight={600}>№ {check.checkNumber} от</Text>
					<Text>{dayjs(check.createdAt).format('DD.MM HH:mm')}</Text>
				</Stack>
				<Divider />
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
					Итог: {check.totalSum} ₽
				</Text>
				<Divider />
			</CardBody>
			<CardFooter pt={0}>
				<Button
					colorScheme="red"
					w="100%"
					isDisabled={check.status === 'CANCELLED'}
					onClick={onToggle}
				>
					Отменить
				</Button>
			</CardFooter>
			<CheckCancelAlert isOpen={isOpen} onClose={onClose} check={check} />
		</Card>
	);
};

export default ChecksCard;
