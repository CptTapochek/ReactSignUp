import style from "../SignUp.module.css";
import React, { useState, useEffect } from "react";
import {NavLink, useNavigate} from "react-router-dom";
import CameraIcon from "../../../assets/icons/camera-icon.svg";
import MainLogo from "../../../assets/icons/logo-small.svg";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import CountryCodes from "../../../assets/data/country-phone-codes.json";
import { requestGraphql } from "../../../helpers";
import SuccessPopUp from "../SuccessPopUp/SuccessPopUp";
import SmallScreenSuccess from "../SuccessPopUp/SignUpSmallScreen";


let current_theme_color = "#36A0C9";

const CountryOptions = (props) => {
	if (props.code === "none"){
		return (
			<option label={""} className={style.disabledOption} value={props.dial_code} defaultValue key={props.dial_code}/>
		);
	}
	return (
		<option className={style.options} name={props.name} value={props.dial_code} key={props.dial_code} label={props.code}/>
	);
     
};

const PersonalDetails = ({ name, pass, setPopUp, setSmallPopUp }) => {
	const navigate = useNavigate();
	const [avatar, setAvatar] = useState("");
	const [email, setEmail] = useState("");
	const [location, setLocation] = useState("");
	const [phone, setPhone] = useState("");
	const [conditionCheckbox, setConditionCheckbox] = useState(false);
	const [selectedDay, setSelectedDay] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [validMessage, setValidMessage] = useState({});

	const months = {
		Jan: 1, Feb: 2, Mar: 3, APR: 4, May: 5, Jun: 6,
		Jul: 7, Aug: 8, Sept: 9, Oct: 10, Nov: 11, Dec: 12
	};

	function DateFormat(){
		let selectedMonth;
		let message = validMessage;
		for (let i = 0; i < 12; i++){
			let month_val = Object.keys(months)[i];
			let month_key = Object.values(months)[i];
			if (selectedDay.month === month_key){
				selectedMonth = month_val;
			}
		}
		document.querySelector("#birthDateInput").style.borderColor = "#96A3A8";
		delete message.datePicker;
		setValidMessage(message);
		return `${selectedMonth} ${selectedDay.day}, ${selectedDay.year}`;
	}

	const renderBirthDateInput = ({ ref }) => (
		<input
			readOnly
			ref={ref}
			placeholder="DD/MM/YYYY"
			value={selectedDay ? DateFormat() : ""}
			style={{
				paddingLeft: "40px"
			}}
			className={style.birth_date_input}
			id="birthDateInput"
		/>
	);


	let country_options = CountryCodes
		.map( codes => <CountryOptions key={codes.code} name={codes.name} code={codes.code} dial_code={codes.dial_code}/>);


	let ChangeImage = (e) => {
		setSelectedImage(e.target.files[0]);
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onloadend = function() {
			setAvatar(reader.result);
		};
		reader.readAsDataURL(file);
	};

	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
		if (name === "" || pass === ""){
			navigate("/sign-up");
		}
	}, [selectedImage]);

	const sendDates = async (e) => {
		e.preventDefault();
		let message = {};

		/* Validation */
		if (!selectedDay){
			document.querySelector("#birthDateInput").style.borderColor = "red";
			message.datePicker = "Enter your birth date please";
		}
		if (email.length === 0){
			message.email = "Please fill out this field";
		}
		setValidMessage(message);

		if (Object.keys(message).length === 0){
			try {
				const res = await requestGraphql(
					"POST",
					`mutation ($data: UserDates){
                        signUp(inputs: $data)
                     }`,
					{
						"data": {
							"firstName": name.firstName,
							"lastName": name.lastName,
							"userName": name.userName,
							"password": pass,
							"birthDate": {
								"day": selectedDay ? selectedDay.day : null,
								"month": selectedDay ? selectedDay.month : null,
								"year": selectedDay ? selectedDay.year : null
							},
							"contacts": [
								{
									"type": "EMAIL",
									"value": email
								},
								{
									"type": "PHONE",
									"value": phone
								}
							],
							"address": location,
							"avatar": avatar
						}
					}
				);

				const { data: { signUp: user } } = await res.json();
				console.log(user);

				if (user === "success"){
					if (window.innerWidth > 650){
						setPopUp(<SuccessPopUp/>);
					} else {
						setSmallPopUp(<SmallScreenSuccess/>);
					}
				} else {
					navigate("/sign-up");
					alert("An error has been detected, please re-enter the data");
				}

			} catch(error) {
				console.error("gql error", error);
			}
		}
	};


	const onChangeTextInput = (e) => {
		const { name, value } = e.target;
		let message = validMessage;
		let phoneValue = "";
		switch (name) {
			case "email":
				delete message.email;
				setEmail(value.trim());
				break;
			case "location":
				setLocation(value.trim());
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
				break;
			default:
				break;
		}
		setValidMessage(message);
	};

	const CheckPolicy = () => {
		setConditionCheckbox(!conditionCheckbox);
		document.querySelector("#complete-btn").disabled = conditionCheckbox;
	};

	let selectCountry = React.createRef();
	let defaultOptionIcon = React.createRef();
	const selectCountryCode = (e) => {
		defaultOptionIcon.current.style.display = "none";
		setPhone(e.target.value + " ");
	};

	return (
		<div className={style.main_content}>
			<div className={style.sign_up_form_detail}>
				<form id={"SignUpForm"} onSubmit={sendDates} className={style.form}>
					<div className={style.main_logo}><img src={MainLogo}/></div>
					<div className={style.form_title}>Personal Details</div><br />
					<div className={style.form_prompt}>Avatar, birthdate, contact details.</div>
					<div className={style.form_block}>
						<div className={style.avatar_input}>
							<div>Profile avatar</div><br />
							<label className={style.avatar_upload}>
								<input
									accept="image/*"
									type="file"
									id="select-image"
									style={{ display: "none" }}
									onChange={ChangeImage}
								/>
								<div className={style.default_avatar} id="AvatarForm">
									<img src={CameraIcon}/>
									{imageUrl && selectedImage && (
										<img src={imageUrl} className={style.inputAvatarImage} alt={selectedImage.name}/>
									)}
								</div>
							</label>
						</div>
						<div className={style.right_inputs}>
							<div className={style.birth_date_block}>
								<label htmlFor={"birth_date_form"}>Birth Date</label>
								<div className={style.calendar_icon} />
								<div className={style.calendar_popup}>
									<DatePicker
										value={selectedDay}
										onChange={setSelectedDay}
										renderInput={renderBirthDateInput}
										inputClassName="birth_date_input"
										colorPrimary={current_theme_color}
										calendarClassName={"inputDateCalendar"}
										colorPrimaryLight="rgba(75, 207, 250, 0.4)"
										shouldHighlightWeekends
									/>
									<div className={style.dataValidateText}>{validMessage.datePicker}</div>
								</div>
							</div><br /><br />
							<label htmlFor={"email_form"}>E-mail address</label><br />
							<input type={"email"} placeholder={"e.g. johndoe@fastmail.com"} id="email_form" name="email" className={validMessage.email ? style.invalidInput : ""} autoComplete={"off"} value={email} onChange={onChangeTextInput}/><br />
							<div className={style.validationText}>{validMessage.email}</div>
						</div>
					</div>

					<label htmlFor={"location_form"}><div className={style.map_pin_icon} />Location</label><br />
					<input type={"text"} id={"location_form"} name="location" placeholder={"Enter location"} className={style.location_input} value={location} onChange={onChangeTextInput}/><br />
					<div className={style.validationText}></div>

					<label htmlFor={"phone_form"}>Phone number</label><br />
					<div ref={defaultOptionIcon} className={style.defaultOption}></div>
					<select className={style.selectCountry} onChange={selectCountryCode} ref={selectCountry}>
						{country_options}
					</select>

					<input type={"tel"} className={style.phone_input} id={"phone_form"} name="phone" placeholder={"+1 (555) 000-0000"} value={phone} onChange={onChangeTextInput}/>
					<br />

					<div className={style.terms_conditions_block}>
						<input className={style.condition_checkbox} onChange={CheckPolicy} type={"checkbox"} id={"terms_condition"}/>
						<label className={style.terms_conditions}>You agree to our friendly
							<NavLink to={"/sign-up/terms-conditions"}>terms and conditions & privacy policy.</NavLink>
						</label>
					</div><br />

					<button type="submit" disabled className={style.continue_btn} id="complete-btn">Complete</button>
				</form>
			</div>
			<div className={style.progress_bar} id={"SignUpProgressBar"}>
				<div />
				<div />
				<div className={style.active_bar} />
			</div>
		</div>
	);
};


export default PersonalDetails;