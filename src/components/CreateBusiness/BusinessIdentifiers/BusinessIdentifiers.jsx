import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CountryCodes from "../../../assets/data/country-phone-codes.json";
import style from "../CreateBusiness.module.css";


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

/* Get input documents */
const AddedDocument = (props) => {
	const [counter, setCounter] = React.useState(0);
	React.useEffect(() => {
		if (props.animation === true){
			counter < 100 && setTimeout(() => setCounter(counter + 1), 17);
		} else {
			setCounter(100);
		}
	}, [counter]);

	if (counter === 100){
		let files = props.selectedDocument;
		for (let file of files){
			if (file.name === props.name){
				file.animation = false;
			}
		}
	}

	return (
		<div className={style.document}>
			<div className={style.topBlock}>
				<div className={style.documentImage}></div>
				<div className={style.textBlock}>
					<div className={style.documentTitle}>{props.name}</div>
					<div className={style.documentSize}>
						{convertSize(props.size)}
					</div>
				</div>
				<div className={style.documentDelete} document={props.name} onClick={props.deleteDocument} title="Delete"></div>
			</div>
			<div className={style.bottomBlock}>
				<div className={style.loadingBar}>
					<div className={`${style.loadingBarBlue} ${props.animation === true ? style.animateLoading : ""}`}></div>
					<div className={style.loadingBarDisabled}></div>
				</div>
				<div className={style.loadingProcent}>{counter}%</div>
			</div>
		</div>
	);
};

const Identifiers = ({setDarkScreen}) => {
	const [selectedDocument, setSelectedDocument] = useState([]);
	const [documentUrl, setDocumentUrl] = useState([]);
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [validMessage, setValidMessage] = useState({});
	const navigate = useNavigate();

	const sendDates = async (e) => {
		e.preventDefault();

		/* Validation */
		let message = {};
		if (email.length === 0){
			message.email = "Please fill out this field";
		}
		if (email.length < 9){
			message.phone = "Please fill out this field";
		}

		if (Object.keys(message).length === 0){
			navigate("/create-business/inventory");
		} else {
			setValidMessage(message);
		}

	};

	const onChangeTextInput = (e) => {
		const { name, value } = e.target;
		let message = validMessage;
		let phoneValue = "";
		switch (name) {
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

	useEffect(() => {
		if (selectedDocument.length > 0) {
			let existFiles = documentUrl;
			for (let element of selectedDocument){
				existFiles.push(URL.createObjectURL(element));
			}
			setDocumentUrl(existFiles);
		}
	}, [selectedDocument.length]);

	/* Set uploaded documents */
	const addDocument = (e) => {
		let files = selectedDocument;
		for (let i = 0; i < e.target.files.length; i++){
			e.target.files[i].animation = true;
			let fileName = e.target.files[i].name.split(".").pop();
			let allowedExtensions = ["jpg", "jpeg", "png", "pdf", "xls", "csv", "zip", "rar", "xlsx"];
			for (let extension of allowedExtensions){
				if (fileName === extension){
					files.push(e.target.files[i]);
				}
			}
		}
		setSelectedDocument(files);
		setDarkScreen("");
	};

	const dragDocument = () => {
		const DarkScreen = () =>{
			return (<div className={style.darkenedScreen}></div>);
		};
		setDarkScreen(<DarkScreen/>);
	};

	const deleteDocument = (e) => {
		let existDocuments = selectedDocument;
		let existDocsUrl = documentUrl;

		for (let i = 0; i < existDocuments.length; i++){
			if (existDocuments[i].name === e.target.getAttribute("document")){
				existDocuments.splice(i, 1);
				existDocsUrl.splice(i, 1);
			}
		}
		setSelectedDocument([...existDocuments]);
		setDocumentUrl([...existDocsUrl]);
	};


	let documentElements = "";
	if (documentUrl.length > 0 && selectedDocument.length > 0){
		const getRandomInt = (max) => {
			return Math.floor(Math.random() * max);
		};
		documentElements = selectedDocument
			.map( file => <AddedDocument key={file.size + getRandomInt(1000)} animation={file.animation} name={file.name} ext={file.name.split(".")[1]} size={file.size} deleteDocument={deleteDocument} setSelectedDocument={setSelectedDocument} selectedDocument={selectedDocument}/>);
	}

	return (
		<div className={style.mainContent} onDragEnter={dragDocument}>
			<div className={style.formBlock}>
				<div className={style.mainLogo}>Create Business</div>
				<div className={style.formTitle}>Business identifiers</div><br />
				<div className={style.formPrompt}>Provide some contact information</div><br /><br /><br />
				<form onSubmit={sendDates} className={style.form}>

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

					<div className={style.uploadDocumentBlock}>
						<div>Business Verification</div><br />
						<div className={style.documentRequest}>*Upload documents that testify this business exist</div>
						<label className={style.documentLabel}>
							<input
								accept="*"
								type="file"
								id="select-image"
								multiple
								onChange={addDocument}
							/>
							<div className={style.uploadImage}></div><br/>
							<div className={style.uploadText}><span>Click to upload</span> or drag and drop</div>
							<div className={style.uploadTextPrompt}>XLS, PDF or JPG (max. 800x400px)</div>
						</label><br/>
						{documentElements}
					</div>

					<button type="submit" className={style.continueBTN}>Next</button>
				</form>
			</div>
		</div>
	);
};

const convertSize = (size) => {
	let result;
	if (size < 1024){
		result = size + " bytes";
	} else if (size > 1024 && size < Math.pow(1024, 2)){
		result = (size/1024).toFixed(2) + " KB";
	} else if (size > Math.pow(1024, 2)){
		result = (size/Math.pow(1024, 2)).toFixed(2) + " MB";
	}
	return result;
};

export default Identifiers;