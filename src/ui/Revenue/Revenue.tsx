import { Spinner, Text } from '@chakra-ui/react';
import { api } from '~/utils/api';
import AnimatedCounter from '../../components/AnimatedCounter';

const Revenue = () => {
	const { data: revenu } = api.checks.getRevenue.useQuery();
	if (!revenu) return <Spinner mx={2} size={'sm'} />;
	return (
		<Text fontSize="lg" fontWeight={600}>
			<AnimatedCounter from={0} to={revenu} /> ₽
		</Text>
	);
};

export default Revenue;
