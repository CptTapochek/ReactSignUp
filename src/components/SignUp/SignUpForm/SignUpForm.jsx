import style from "../SignUp.module.css";
import MainLogo from "../../../assets/icons/logo-small.svg";
import {NavLink, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {requestGraphql} from "../../../helpers";


const SignUpForm = ({ setName }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userName, setUserName] = useState("");
	const [validMessage, setValidMessage] = useState({});
	const navigate = useNavigate();

	const sendDates = async (e) => {
		e.preventDefault();

		/* Validation */
		let message = {};
		if (firstName.length < 2 || firstName.length > 25){
			message.firstName = "Please fill out this field";
		}
		if (lastName.length < 2 || lastName.length > 25){
			message.lastName = "Please fill out this field";
		}
		if (userName.length < 2 || userName.length > 25){
			message.userName = "Please fill out this field";
		}
		// let result = await checkUserName(userName);
		// if (result === "exist"){
		// 	message.userName = "This username has already been used";
		// }
		if (Object.keys(message).length === 0){
			setName({
				firstName: firstName,
				lastName: lastName,
				userName: userName
			});
			navigate("/sign-up/choose-password");
		} else {
			setValidMessage(message);
		}
        
	};

	const onChangeTextInput = (e) => {
		const { name, value } = e.target;
		let message = validMessage;
		switch (name) {
			case "firstName":
				setFirstName(value.trim());
				delete message.firstName;
				break;
			case "lastName":
				setLastName(value.trim());
				delete message.lastName;
				break;
			case "userName":
				setUserName(value.trim());
				delete message.userName;
				break;
			default:
				break;
		}
		setValidMessage(message);
	};

	return (
		<div className={style.main_content}>
			<div className={style.sign_up_form}>
				<div className={style.main_logo}><img src={MainLogo}/></div>
				<div className={style.form_title}>Sign Up</div><br />
				<div className={style.form_prompt}>Start your 30-day free trial.</div><br />
				<form onSubmit={sendDates} className={style.form}>
					<label htmlFor={"first_name_form"}>First Name*</label><br />
					<input type={"text"} className={validMessage.firstName ? style.invalidInput : ""} placeholder={"Enter your first name"} value={firstName} name="firstName" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.firstName}</div>

					<label htmlFor={"last_name_form"}>Last Name*</label><br />
					<input type={"text"} className={validMessage.lastName ? style.invalidInput : ""} placeholder={"Enter your last name"} value={lastName} name="lastName" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.lastName}</div>

					<label htmlFor={"user_name_form"}>User Name*</label><br />
					<input type={"text"} className={validMessage.userName ? style.invalidInput : ""} placeholder={"Enter your user name"} value={userName} name="userName" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.userName}</div>

					<button type="submit" className={style.continue_btn}>Continue</button>
				</form>
				<div className={style.have_an_account}>
                    Already have an account? <NavLink to={"/login"}>Log in</NavLink>
				</div>
			</div>
			<div className={style.progress_bar}>
				<div className={style.active_bar} />
				<div />
				<div />
			</div>
		</div>
	);
};

const checkUserName = async (userName) => {
	const res = await requestGraphql(
		"POST",
		`query ($data: Name){
                        checkUsername(userName: $data)
                     }`,
		{
			"data": {
				"data": userName
			}
		}
	);

	const { data: { checkUsername: name } } = await res.json();
	return name;
};


export default SignUpForm;