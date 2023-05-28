import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
	const client = await MongoClient.connect(
		process.env.DB_URL ||
			"mongodb://localhost:27017/auth_dev_next?retryWrites=true&w=majority"
	);
	return client;
};
