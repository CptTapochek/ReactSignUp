import style from "../SignUp.module.css";
import MainLogo from "../../../assets/icons/logo-small.svg";
import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";

const ChoosePass = ({ setPass, name }) => {
	const [password, setPassword] = useState("");
	const [password_confirm, setPasswordConfirm] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (name === ""){
			navigate("/sign-up");
		}
	});

	const [validMessage, setValidMessage] = useState({});


	const sendDates = (e) => {
		e.preventDefault();

		/* Validation */
		let message = {};
		if (password.length < 8 || password.length > 16){
			message.password = "Password must be at least 8 characters";
		}
		if (password !== password_confirm){
			message.confirmPassword = "Password don't match";
		}
		if (Object.keys(message).length === 0){
			setPass(password);
			navigate("/sign-up/personal-details");
		} else {
			setValidMessage(message);
		}
	};

	const onChangeTextInput = (e) => {
		let message = validMessage;
		const { name, value } = e.target;
		if (name === "password"){
			delete message.password;
			setPassword(value.trim());
		} else if (name === "password_confirm"){
			delete message.confirmPassword;
			setPasswordConfirm(value.trim());
		}
		setValidMessage(message);
	};

	return (
		<div className={style.main_content}>
			<div className={style.sign_up_form}>
				<div className={style.main_logo}><img src={MainLogo}/></div>
				<div className={style.form_title}>Choose a password</div><br />
				<div className={style.form_prompt}>Must be at least 8 characters.</div>
				<br />
				<form onSubmit={sendDates} className={style.form}>
					<label htmlFor={"password_form"} /><br />
					<input type={"password"} className={validMessage.password || validMessage.confirmPassword ? style.invalidInput : ""}  value={password} name="password" onChange={onChangeTextInput} placeholder={"Choose a password"}/><br />
					<div className={style.validationText}>{validMessage.password}</div>

					<label htmlFor={"confirm_pass_form"} /><br />
					<input type={"password"} className={validMessage.confirmPassword ? style.invalidInput : ""} name="password_confirm" value={password_confirm} onChange={onChangeTextInput} placeholder={"Confirm password"}/><br />
					<div className={style.validationText}>{validMessage.confirmPassword}</div>

					<button type="submit" className={style.continue_btn}>Continue</button>
				</form>
			</div>
			<div className={style.progress_bar}>
				<div />
				<div className={style.active_bar} />
				<div />
			</div>
		</div>
	);
};

export default ChoosePass;