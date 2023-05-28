import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const AuthOption = {
	// object used to configure NextAuth's behaviour
	session: {
		strategy: "jwt",
	},
	secret: "asd",
	providers: [
		CredentialProvider({
			name: "credentials",
			authorize: async (credentials) => {
				let { email, password } = credentials;
				let client = await connectToDatabase();
				const userCollection = client.db().collection("users");
				const user = await userCollection.findOne({ email });

				if (!user) {
					throw new Error("No user Found! Try Signing Up First!!");
				}

				const isValid = await verifyPassword(password, user.password);

				if (!isValid) {
					throw new Error(
						"Password is Wrong! Please check the Credentials Again!!"
					);
				}

				client.close();
				return { email };
			},
			credentials: {
				email: {},
				password: {},
			},
		}),
	],
};
export default NextAuth(AuthOption);
