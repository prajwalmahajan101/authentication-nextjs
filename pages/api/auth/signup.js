import { connectToDatabase } from "@/lib/db";
import { emailValidator, passwordValidator } from "@/lib/validator";
import { hashedPassword } from "@/lib/auth";

const handler = async (req, res) => {
	let { method } = req;
	if (method === "POST") {
		const { email, password } = req.body;
		if (!email || !emailValidator(email)) {
			return res.status(422).json({
				status: false,
				message: "The Given email is not correct",
			});
		}

		if (!password || !passwordValidator(password)) {
			client.close();
			return res.status(422).json({
				status: false,
				message:
					"The Given password should be atleast 8 character long",
			});
		}
		try {
			let client = await connectToDatabase();
			const db = client.db();
			let userCollection = db.collection("users");

			const existingUser = await userCollection.findOne({ email });
			if (existingUser) {
				return res.status(409).json({
					status: true,
					message: "Email Already taken",
				});
			}

			const hashed_password = await hashedPassword(password);

			const user = await userCollection.insertOne({
				email,
				password: hashed_password,
			});

			const createdUser = {
				id: user.insertedId,
				email,
			};
			client.close();
			return res.status(201).json({
				status: true,
				message: "User Signed Up Succcessfully",
				user: createdUser,
			});
		} catch (err) {
			client.close();
			return res.status(500).json({
				status: false,
				message: "Something went Wrong",
			});
		}
	}
};

export default handler;
