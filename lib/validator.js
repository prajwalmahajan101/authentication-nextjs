export const emailValidator = (value) => {
	value = value.trim();
	if (value === "") return false;
	let emailRegex =
		/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	return value.match(emailRegex);
};

export const passwordValidator = (value) => {
	value = value.trim();
	return value.length > 7;
};
