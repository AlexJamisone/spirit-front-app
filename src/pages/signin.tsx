import { SignIn } from '@clerk/nextjs';
import AnimataedLayout from '~/components/AnimataedLayout';

const SignInPage = () => {
	return (
		<AnimataedLayout>
			<SignIn
				afterSignInUrl={'/'}
				afterSignUpUrl={'/'}
				signUpUrl="/signup"
			/>
		</AnimataedLayout>
	);
};

export default SignInPage;
