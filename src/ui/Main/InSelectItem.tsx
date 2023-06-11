import { Stack, Text } from '@chakra-ui/react';
import type { ProductItems } from '~/recducer/controlReducer';

type InSelectItemProps = {
	inCartItems: ProductItems;
};

const InSelectItem = ({ inCartItems }: InSelectItemProps) => {
	return (
		<Stack
			direction="row"
			position="relative"
			justifyContent="space-between"
		>
			<Text
				fontWeight={600}
				fontSize="small"
				bgColor={'telegram.200'}
				rounded="full"
				px={1.5}
				lineHeight={1.8}
				textAlign="center"
			>
				{inCartItems.size}
			</Text>
			<Text
				fontWeight={600}
				fontSize="small"
				bgColor={'telegram.200'}
				rounded="full"
				px={2}
				lineHeight={1.8}
				textAlign="center"
			>
				{inCartItems.quantity}
			</Text>
		</Stack>
	);
};

export default InSelectItem;
