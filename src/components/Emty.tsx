import { Button, Stack, Text } from '@chakra-ui/react';
import { useMainContext } from '~/context/mainContext';

const Emty = () => {
	const { dispatchCtrl } = useMainContext();
	return (
		<Stack justifyContent="center">
			<Text fontSize="2xl" textAlign="center" textColor="blackAlpha.600">
				Здесь пусто
			</Text>
			<Button
				w="100%"
				onClick={() => dispatchCtrl({ type: 'INITIAL' })}
				variant="outline"
			>
				Вернуться на главную
			</Button>
		</Stack>
	);
};

export default Emty;
