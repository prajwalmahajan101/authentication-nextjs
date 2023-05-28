import { hash, compare } from "bcryptjs";

export const hashedPassword = async (password) => {
	const hashed_password = await hash(password, 12);
	return hashed_password;
};

export const verifyPassword = async (password, hashed_passowrd) => {
	const isValid = await compare(password, hashed_passowrd);
	return isValid;
};
