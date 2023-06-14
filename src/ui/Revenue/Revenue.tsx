import { Text } from '@chakra-ui/react';
import { api } from '~/utils/api';
import AnimatedCounter from '../../components/AnimatedCounter';

const Revenue = () => {
	const { data: revenu } = api.checks.getRevenue.useQuery();
	return (
		<Text fontSize="lg" fontWeight={600}>
			<AnimatedCounter from={0} to={revenu ?? 0} /> ₽
		</Text>
	);
};

export default Revenue;
