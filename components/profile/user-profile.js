import { useSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useRouter } from "next/router";

function UserProfile() {
	// Redirect away if NOT auth
	// const { data: session, status } = useSession();

	// const router = useRouter();
	// if (status === "loading") {
	// 	return <p classesName={classes.profile}>Loading</p>;
	// }

	// if (status !== "loading" && !session) {
	// 	router.push("/auth");
	// }

	const changePasswordHandler = async (data) => {
		try {
			const res = await fetch("/api/user/change-password", {
				method: "PATCH",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const resData = await res.json();
			if (!res.ok) {
				throw new Error(resData.message);
			}
			console.log(resData);
		} catch (err) {
			console.log(err.message);
		}
	};
	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			<ProfileForm onChangePassword={changePasswordHandler} />
		</section>
	);
}

export default UserProfile;
