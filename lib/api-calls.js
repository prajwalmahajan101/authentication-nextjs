export const createUser = async (email, password) => {
	try {
		const res = await fetch("/api/auth/signup", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		if (!res.ok) {
			throw new Error(data.message);
		}
		return data;
	} catch (err) {
		throw new Error(err.message || "Somethingwent wrong");
	}
};
