import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";  
import { createUser } from "@/lib/api-calls";
import classes from "./auth-form.module.css";

function AuthForm() {
	const [isLogin, setIsLogin] = useState(true);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const router = useRouter();

	function switchAuthModeHandler() {
		setIsLogin((prevState) => !prevState);
	}

	const formSubmitHandler = async (evt) => {
		evt.preventDefault();
		let email = emailInputRef.current.value;
		let password = passwordInputRef.current.value;
		if (isLogin) {
			// log user in
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (!result.error) {
				router.replace("/profile");
			}
		} else {
			try {
				const result = await createUser(email, password);
				console.log(result);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? "Login" : "Sign Up"}</h1>
			<form onSubmit={formSubmitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input
						type="email"
						id="email"
						required
						ref={emailInputRef}
					/>
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					<button>{isLogin ? "Login" : "Create Account"}</button>
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin
							? "Create new account"
							: "Login with existing account"}
					</button>
				</div>
			</form>
		</section>
	);
}

export default AuthForm;
