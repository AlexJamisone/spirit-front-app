import { Center, Image } from '@chakra-ui/react';

interface EmailProps {
	src: string;
}

const Email = ({ src }: EmailProps) => {
	return (
		<Center>
			<Image src={src} alt="check" />
		</Center>
	);
};

export default Email;
