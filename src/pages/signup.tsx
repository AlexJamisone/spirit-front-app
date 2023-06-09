import { SignUp } from '@clerk/clerk-react';
import AnimataedLayout from '~/components/AnimataedLayout';

const SigUpPage = () => {
	return (
		<AnimataedLayout>
			<SignUp
				afterSignInUrl={'/'}
				afterSignUpUrl={'/'}
				signInUrl="/signin"
			/>
		</AnimataedLayout>
	);
};

export default SigUpPage;
