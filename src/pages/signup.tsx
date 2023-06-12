import { SignUp } from '@clerk/clerk-react';
import AnimataedLayout from '~/components/AnimataedLayout';

const SigUpPage = () => {
	return (
		<AnimataedLayout>
			<SignUp signInUrl="/signin" afterSignUpUrl="/" />
		</AnimataedLayout>
	);
};

export default SigUpPage;
