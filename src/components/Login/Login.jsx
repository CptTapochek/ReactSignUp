import style from "./Login.module.css";
import React, {useState} from "react";
import Google from "../../assets/icons/logo-google.svg";
import MainLogo from "../../assets/icons/logo-small.svg";
import LoginSideBar from "./LoginSideBar/LoginSideBar";
import {NavLink, Route, Routes} from "react-router-dom";
import {requestGraphql} from "../../helpers";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [validMessage, setValidMessage] = useState({});

	const sendDates = async (e) => {
		e.preventDefault();

		/* Validation */
		let message = {};
		if (userName.length === 0){
			message.userName = "Please fill out this field";
		}
		if (password.length === 0){
			message.password = "Please fill out this field";
		}

		await setValidMessage(message);
		if (Object.keys(message).length === 0){
			const res = await requestGraphql(
				"POST",
				`mutation ($data: LoginDates){
                        Login(inputs: $data)
                     }`,
				{
					"data": {
						"userName": userName,
						"password": password,
						"remember": remember
					}
				}
			);

			const { data: { Login: response } } = await res.json();
			if (response !== "success"){
				setValidMessage({
					userName: response,
					password: response
				});
			}
		}
	};

	const onChangeTextInput = (e) => {
		let message = validMessage;
		const { name, value } = e.target;
		if (name === "userName"){
			delete message.userName;
			setUserName(value.trim());
		} else if (name === "password"){
			delete message.password;
			setPassword(value.trim());
		}

		setValidMessage(message);
	};

	return (
		<Routes>
			<Route path={"/forgot-password"} element={<ForgotPassword/>}/>
			<Route path={"/"} element={
				<div className={style.completionForm}>
					<LoginSideBar/>
					<div className={style.mainContent}>
						<div className={style.loginForm}>
							<div className={style.main_logo}><img src={MainLogo}/></div>
							<div className={style.formTitle}>Log in to your account</div><br />
							<div className={style.form_prompt}>Welcome back! Please enter your details.</div>
							<br />
							<form onSubmit={sendDates} className={style.form}>
								<label htmlFor={"userName"}>User Name*</label><br />
								<input className={validMessage.userName ? style.invalidInput : ""} value={userName} onChange={onChangeTextInput} type={"text"} name="userName" placeholder={"User name"}/><br />
								<div className={style.validationText}>{validMessage.userName}</div>

								<label htmlFor={"password"}>Password*</label><br />
								<input className={validMessage.password ? style.invalidInput : ""} value={password} onChange={onChangeTextInput} type={"password"} name="password" placeholder={"Password"}/><br />
								<div className={style.validationText}>{validMessage.password}</div>

								<div className={style.forgotPassword}>
									<input type={"checkbox"} name={"remember"} onChange={()=>setRemember(!remember)}/>
									<label htmlFor={"remember"}>Remember for 30 days</label>
									<NavLink to={"/login/forgot-password"}>Forgot password</NavLink>
								</div><br/><br/><br/>

								<button type="submit" className={style.LoginBtn}>Sign in</button>
								<button type="submit" className={style.GoogleBtn}>
									<img src={Google}/>Sign in with Google
								</button>

								<div className={style.toSignUp}>Don’t have an account?
									<NavLink to={"/sign-up"}>Sign up</NavLink>
								</div>
							</form>
						</div>
					</div>
				</div>
			}/>
		</Routes>
	);
};

export default Login;