import { Stack, Text } from '@chakra-ui/react';
import { UserButton } from '@clerk/nextjs';
import { useReducer, type ReactNode } from 'react';
import AnimataedLayout from '~/components/AnimataedLayout';
import MainContext from '~/context/mainContext';
import { controlsReducer, initial } from '~/recducer/controlReducer';
import MainCategorys from './MainCategorys';
type MainProps = {
	user?: ReactNode;
	categorys?: ReactNode;
};
const Main = ({ user, categorys }: MainProps) => {
	const [state, dispatch] = useReducer(controlsReducer, initial);
	return (
		<MainContext.Provider
			value={{
				dispatch,
				state,
			}}
		>
			<AnimataedLayout>
				<Stack w="100%">
					<Stack
						as="header"
						direction="row"
						justifyContent="space-between"
						m={5}
					>
						<Text>Выручка за сегодня</Text>
						{user}
					</Stack>
					{categorys}
				</Stack>
			</AnimataedLayout>
		</MainContext.Provider>
	);
};

Main.User = UserButton;
Main.Categorys = MainCategorys;

export default Main;
