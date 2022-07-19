import style from "../CreateBusiness.module.css";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import CountryCodes from "../../../assets/data/country-phone-codes.json";


/* Set phone code */
const CountryOptions = (props) => {
	if (props.code === "none"){
		return (
			<option label={""} className={style.disabledOption} value={props.dial_code} defaultValue key={props.dial_code}/>
		);
	}
	return (
		<option name={props.name} value={props.dial_code} key={props.dial_code} label={props.code}/>
	);
};

const BasicInfo = () => {
	const [name, setName] = useState("NextLogic");
	const [location, setLocation] = useState("");
	const [email, setEmail] = useState("andreib@nextlogic.ro");
	const [phone, setPhone] = useState("+40735945678");
	const [description, setDescription] = useState("");
	const [validMessage, setValidMessage] = useState({});
	const navigate = useNavigate();

	const sendDates = async (e) => {
		e.preventDefault();

		/* Validation */
		let message = {};
		if (name.length < 2 || name.length > 50){
			message.name = "Please fill out this field";
		}
		if (email.length === 0){
			message.email = "Please fill out this field";
		}
		if (phone.length < 9){
			message.phone = "Please fill out this field";
		}

		if (Object.keys(message).length === 0){
			navigate("/create-business/identifiers");
		} else {
			setValidMessage(message);
		}

	};

	const onChangeTextInput = (e) => {
		const { name, value } = e.target;
		let message = validMessage;
		let phoneValue = "";
		switch (name) {
			case "name":
				setName(value.trim());
				delete message.name;
				break;
			case "location":
				setLocation(value.trim());
				delete message.location;
				break;
			case "email":
				setEmail(value.trim());
				delete message.email;
				break;
			case "phone":
				if (!phone){
					phoneValue += "+";
					defaultOptionIcon.current.style.display = "flex";
				}
				phoneValue += value.replace(/[A-Za-z]|`|=|_|&|%|#|@|>|<|,/gm, "").trim();
				for (let code of CountryCodes){
					if (code.dial_code === phoneValue){
						selectCountry.current.value = code.dial_code;
						defaultOptionIcon.current.style.display = "none";
					}
					else if (code.dial_code !== phoneValue && phoneValue.length < 2) {
						selectCountry.current.value = 0;
						defaultOptionIcon.current.style.display = "flex";
					}
				}
				setPhone(phoneValue);
				delete message.phone;
				break;
			case "description":
				setDescription(value.trim());
				delete message.description;
				break;
			default:
				break;
		}
		setValidMessage(message);
	};

	/* Set Business Phone */
	let country_options = CountryCodes
		.map( codes => <CountryOptions key={codes.code} name={codes.name} code={codes.code} dial_code={codes.dial_code}/>);

	let defaultOptionIcon = React.createRef();
	let selectCountry = React.createRef();

	const selectCountryCode = (e) => {
		defaultOptionIcon.current.style.display = "none";
		setPhone(e.target.value + " ");
	};

	return (
		<div className={style.mainContent}>
			<div className={style.formBlock}>
				<div className={style.mainLogo}>Create Business</div>
				<div className={style.formTitle}>Business basic info</div><br />
				<div className={style.formPrompt}>Some basic information about your business</div><br /><br /><br />
				<form onSubmit={sendDates} className={style.form}>
					<label htmlFor={"name"}>Business Name</label><br />
					<input type={"text"} className={validMessage.name ? style.invalidInput : ""} placeholder={"Business name"} value={name} name="name" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.name}</div>

					<label htmlFor={"location"}><div className={style.map_pin_icon} />Business Location Address</label><br />
					<input type={"text"} className={`${validMessage.location ? style.invalidInput : ""} ${style.location_input}`} placeholder={"Full address here"} value={location} name="location" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.location}</div>

					<label htmlFor={"email"}>Business Email</label><br />
					<input type={"email"} className={validMessage.email ? style.invalidInput : ""} placeholder={"your@company.com"} value={email} name="email" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.email}</div>

					<label htmlFor={"phone"}>Phone number</label><br />
					<div ref={defaultOptionIcon} className={style.defaultOption}></div>
					<select className={`${style.selectCountry} ${validMessage.phone ? style.invalidInput : ""}`} ref={selectCountry} onChange={selectCountryCode}>
						{country_options}
					</select>

					<input type={"tel"} className={`${style.phone_input} ${validMessage.phone ? style.invalidInput : ""}`} name="phone" placeholder={"+1 (555) 000-0000"} value={phone} onChange={onChangeTextInput}/><br/>
					<div className={style.validationText}>{validMessage.phone}</div>

					<label htmlFor={"description"}>Description</label><br />
					<textarea className={`${validMessage.description ? style.invalidInput : ""} ${style.textarea}`} value={description} name="description" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.description}</div>


					<button type="submit" className={style.continueBTN}>Next</button>
				</form>
			</div>
		</div>
	);
};

export default BasicInfo;