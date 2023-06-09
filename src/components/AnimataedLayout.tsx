import { Center, CenterProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type AnimataedLayoutProps = {
	children: ReactNode;
	container?: CenterProps;
};

const AnimataedLayout = ({ children, container }: AnimataedLayoutProps) => {
	return (
		<Center
			as={motion.div}
			initial={{
				opacity: 0,
				y: -100,
			}}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					type: 'spring',
					duration: 0.5,
					delay: 0.5,
				},
			}}
			{...container}
		>
			{children}
		</Center>
	);
};

export default AnimataedLayout;
