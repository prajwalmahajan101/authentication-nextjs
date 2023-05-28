import { getSession } from "next-auth/react";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
	return <AuthForm />;
}

export const getServerSideProps = async (ctx) => {
	const session = await getSession({ req: ctx.req });
	if (session) {
		return {
			redirect: {
				destination: "/",
				parmanent: false,
			},
		};
	}
	return {
		props: {
			session,
		},
	};
};

export default AuthPage;
