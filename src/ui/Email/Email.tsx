import { Center } from '@chakra-ui/react';

interface EmailProps {
	src: string;
}

const Email = ({ src }: EmailProps) => {
	return (
		<Center>
			<img src={src} alt="check" />
		</Center>
	);
};

export default Email;
