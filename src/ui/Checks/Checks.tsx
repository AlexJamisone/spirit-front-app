import { Center, Spinner, Text } from '@chakra-ui/react';
import AnimataedLayout from '~/components/AnimataedLayout';
import { api } from '~/utils/api';
import ChecksCard from './ChecksCard';

const Checks = () => {
	const { data: checks, isLoading } = api.checks.get.useQuery();
	if (isLoading)
		return (
			<Center>
				<Spinner size="lg" />
			</Center>
		);
	if (!checks || checks.length === 0)
		return <Text textAlign="center">Нету Чеков</Text>;
	return (
		<AnimataedLayout delay={0}>
			<Center flexDirection="column" gap={3}>
				{checks.map((check) => (
					<ChecksCard key={check.id} check={check} />
				))}
			</Center>
		</AnimataedLayout>
	);
};

export default Checks;
