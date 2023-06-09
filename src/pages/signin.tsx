import { SignIn } from '@clerk/nextjs';
import AnimataedLayout from '~/components/AnimataedLayout';

const SignInPage = () => {
	return (
		<AnimataedLayout
			container={{
				w: '100vw',
				h: '100vh',
			}}
		>
			<SignIn
				afterSignInUrl={'/'}
				afterSignUpUrl={'/'}
				signUpUrl="/signup"
			/>
		</AnimataedLayout>
	);
};

export default SignInPage;
