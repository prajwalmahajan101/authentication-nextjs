import { hashedPassword, verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { passwordValidator } from "@/lib/validator";
import { getServerSession } from "next-auth";
import { AuthOption } from "../auth/[...nextauth]";

const handler = async (req, res) => {
	const { method } = req;
	if (method !== "PATCH") {
		return;
	}
	const session = await getServerSession(req, res, AuthOption);
	if (!session) {
		return res.status(401).json({
			status: false,
			message: "Not Authenticated",
		});
	}

	const { user } = session;
	const { email } = user;
	const { oldPassword, newPassword } = req.body;
	if (
		!newPassword ||
		!passwordValidator(newPassword) ||
		!oldPassword ||
		!passwordValidator(oldPassword)
	) {
		return res.status(422).json({
			status: false,
			message: "Passwords Should Atleast Contain 8 characters",
		});
	}
	try {
		const client = await connectToDatabase();
		const usersCollection = client.db().collection("users");
		const existingUser = await usersCollection.findOne({ email });
		if (!existingUser) {
			client.close();
			return res.status(401).json({
				status: false,
				message: "User Does not Exist Anymore",
			});
		}
		const isvalid = await verifyPassword(
			oldPassword,
			existingUser.password
		);
		if (!isvalid) {
			client.close();
			return res.status(403).json({
				status: false,
				message: "Old Password is Wrong",
			});
		}
		const new_hash = await hashedPassword(newPassword);
		const new_user = await usersCollection.updateOne(
			{ email },
			{ $set: { password: new_hash } }
		);
		client.close();
		console.log(new_user);
		return res.status(200).json({
			status: true,
			message: "Password Changed Successfully",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			status: false,
			message: err.message || "Something Went Wrong",
		});
	}
};

export default handler;
