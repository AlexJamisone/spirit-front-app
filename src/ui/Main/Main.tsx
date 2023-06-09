import { Stack, Text } from '@chakra-ui/react';
import { UserButton } from '@clerk/nextjs';
import type { ReactNode } from 'react';
import AnimataedLayout from '~/components/AnimataedLayout';
import MainCategorys from './MainCategorys';
type MainProps = {
	user?: ReactNode;
	categorys?: ReactNode;
};
const Main = ({ user, categorys }: MainProps) => {
	return (
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
	);
};

Main.User = UserButton;
Main.Categorys = MainCategorys;

export default Main;
