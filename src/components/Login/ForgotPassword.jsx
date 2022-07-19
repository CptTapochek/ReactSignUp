import style from "./Login.module.css";
import React, {useState} from "react";
import MainLogo from "../../assets/icons/logo-small.svg";
import LoginSideBar from "./LoginSideBar/LoginSideBar";
import {NavLink} from "react-router-dom";
import {requestGraphql} from "../../helpers";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [validMessage, setValidMessage] = useState({});

	const sendDates = async (e) => {
		e.preventDefault();

		/* Validation */
		let message = {};
		if (email.length === 0){
			message.email = "Please fill out this field";
		}

		await setValidMessage(message);
		if (Object.keys(message).length === 0){
			const res = await requestGraphql(
				"POST",
				`query ($data: Email){
                        ForgotPassword(input: $data)
                     }`,
				{
					"data": {
						"data": email
					}
				}
			);

			const { data: { ForgotPassword: response } } = await res.json();
			if (response !== "success"){
				setValidMessage({
					email: response
				});
			}
		}
	};

	const onChangeTextInput = (e) => {
		let message = validMessage;
		const { name, value } = e.target;
		if (name === "email") {
			delete message.email;
			setEmail(value.trim());
		}
		setValidMessage(message);
	};

	return (
		<div className={style.completionForm}>
			<LoginSideBar/>
			<div className={style.mainContent}>
				<div className={style.loginForm}>
					<div className={style.main_logo}><img src={MainLogo}/></div>
					<div className={style.formTitle}>Forgot password</div><br />
					<div className={style.form_prompt}>Enter your email to reset the password.</div>
					<br />
					<form onSubmit={sendDates} className={style.form}>
						<label htmlFor={"email"}>Email*</label><br />
						<input className={validMessage.email ? style.invalidInput : ""} value={email} placeholder={"e.g. johndoe@fastmail.com"} onChange={onChangeTextInput} type={"email"} name="email"/><br />
						<div className={style.validationText}>{validMessage.email}</div>

						<button type="submit" className={style.LoginBtn}>Reset password</button>

						<div className={style.toSignUp}>Don’t have an account?
							<NavLink to={"/sign-up"}>Sign up</NavLink>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;