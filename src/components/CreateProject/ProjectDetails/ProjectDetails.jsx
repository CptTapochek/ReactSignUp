import style from "../CreateProject.module.css";
import React, {useEffect, useState} from "react";
import CurrencyCodes from "../../../assets/data/money-currency.json";
import DatePicker from "react-modern-calendar-datepicker";
import {useNavigate} from "react-router-dom";

let currentThemeColor = "#36A0C9";

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
				<div className={style.documentImage}/>
				<div className={style.textBlock}>
					<div className={style.documentTitle}>{props.name}</div>
					<div className={style.documentSize}>
						{convertSize(props.size)}
					</div>
				</div>
				<div className={style.documentDelete} document={props.name} onClick={props.deleteDocument} title="Delete"/>
			</div>
			<div className={style.bottomBlock}>
				<div className={style.loadingBar}>
					<div className={`${style.loadingBarBlue} ${props.animation === true ? style.animateLoading : ""}`}/>
					<div className={style.loadingBarDisabled}/>
				</div>
				<div className={style.loadingProcent}>{counter}%</div>
			</div>
		</div>
	);
};

/* Set money currency */
const CurrencyOptions = (props) => {
	if (props.currency === "USD"){
		return (
			<option name={props.name} label={props.currency} value={props.currency} defaultValue key={props.keys}/>
		);
	}
	return (
		<option name={props.name} value={props.currency} key={props.keys} label={props.currency}/>
	);
};

const ProjectDetails = ({setDarkScreen, darkScreen}) => {
	const [users, setUsers] = useState(["user_1", "user_2", "user_3"]);
	const [selectedDocument, setSelectedDocument] = useState([]);
	const [documentUrl, setDocumentUrl] = useState([]);
	const [budget, setBudget] = useState({
		amount: "",
		currency: "USD"
	});
	const [reserve, setReserve] = useState({
		amount: "",
		currency: "USD"
	});
	const [selectedDayRange, setSelectedDayRange] = useState({
		from: null,
		to: null
	});
	const [validMessage, setValidMessage] = useState({});
	const navigate = useNavigate();

	const sendDates = async (e) => {
		e.preventDefault();

		/* Validation */
		let message = {};

		if (Object.keys(message).length === 0){
			navigate("/create-project/details");
		} else {
			setValidMessage(message);
		}
	};

	const onChangeTextInput = (e) => {
		const { name, value } = e.target;
		let message = validMessage;
		let afterPoint = "";
		switch (name) {
			case "users":
				setUsers(value);
				break;
			case "budgetCurrency":
				setBudget({
					...budget,
					currency: value
				});
				break;
			case "budgetAmount":
				setBudget({
					...budget,
					amount: value.replace(/[A-Za-z]|`|=|_|&|%|#|@|>|</gm, "").trim()
				});
				break;
			case "reserveCurrency":
				setReserve({
					...reserve,
					currency: value
				});
				break;
			case "reserveAmount":
				setReserve({
					...reserve,
					amount: value.replace(/[A-Za-z]|`|=|_|&|%|#|@|>|<|,/gm, "").trim()
				});
				break;
			default:
				break;
		}
		setValidMessage(message);
	};

	/* Set uploaded documents */
	useEffect(() => {
		if (selectedDocument.length > 0) {
			let existFiles = documentUrl;
			for (let element of selectedDocument){
				existFiles.push(URL.createObjectURL(element));
			}
			setDocumentUrl(existFiles);
		}
	}, [selectedDocument.length]);

	const addDocument = (e) => {
		let files = selectedDocument;
		for (let i = 0; i < e.target.files.length; i++){
			e.target.files[i].animation = true;
			let fileName = e.target.files[i].name.split(".").pop();
			let allowedExtensions = ["jpg", "jpeg", "png", "pdf", "xls", "csv", "zip", "rar", "xlsx", "doc"];
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
		console.log(darkScreen.length);
		const DarkScreen = () =>{
			return (<div className={style.darkenedScreen}/>);
		};
		setDarkScreen(<DarkScreen setElement={"25576"}/>);
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
			.map( file => <AddedDocument
				key={file.size + getRandomInt(1000)}
				animation={file.animation}
				name={file.name}
				ext={file.name.split(".").pop()}
				size={file.size}
				deleteDocument={deleteDocument}
				setSelectedDocument={setSelectedDocument}
				selectedDocument={selectedDocument}
			/>);
	}

	let currencyOptions = CurrencyCodes
		.map( codes => <CurrencyOptions key={codes.key} keys={codes.key} name={codes.name} currency={codes.currency}/>);


	return (
		<div className={style.mainContent} onDragEnter={dragDocument}>
			<div className={style.formBlock}>
				<div className={style.mainLogo}>Create Project</div>
				<div className={style.formTitle}>Details</div><br />
				<div className={style.formPrompt}>Provide detailed information for this project</div><br /><br /><br />
				<form onSubmit={sendDates} className={style.form}>
					<input type={"text"} autoComplete="off" className={`${style.addUserInput} ${validMessage.users ? style.invalidInput : ""}`} placeholder={"Enter a machine name, manufacturer or model"} value={users} name="users" onChange={onChangeTextInput}/>
					<button type="button" className={style.addUserBTN} title="Add user"><div className={style.searchIcon}/></button><br />
					<div className={style.validationText}>{validMessage.users}</div>

					<div className={style.uploadDocumentBlock}>
						<div>Resources</div><br />
						<div className={style.documentRequest}>*Upload documents representing the resources for this project</div>
						<label className={`${style.documentLabel} ${darkScreen.props ? style.setZ_Index : ""}`}>
							<input
								accept="*"
								type="file"
								multiple
								onChange={addDocument}
							/>
							<div className={style.uploadImage}/><br/>
							<div className={style.uploadText}><span>Click to upload</span> or drag and drop</div>
							<div className={style.uploadTextPrompt}>XLS, PDF or JPG (max. 800x400px)</div>
						</label><br/>
						{documentElements}
					</div>

					<div className={style.moneyInput}>
						<label htmlFor={"budget"}>Budget</label><br />
						<div className={style.dollarIcon}/>
						<select className={style.selectCurrency} name="budgetCurrency" value={budget.currency} onChange={onChangeTextInput}>
							{currencyOptions}
						</select>
						<input type={"text"} placeholder={"Add budget"} name="budgetAmount" value={budget.amount} onChange={onChangeTextInput}/>
					</div><div className={style.validationText}>{validMessage.budget}</div>

					<div className={style.moneyInput}>
						<label htmlFor={"reserve"}>Reserve</label><br />
						<div className={style.dollarIcon}/>
						<select className={style.selectCurrency} name="reserveCurrency" value={reserve.currency} onChange={onChangeTextInput}>
							{currencyOptions}
						</select>
						<input type={"text"} placeholder={"Add budget"} name="reserveAmount" value={reserve.amount} onChange={onChangeTextInput}/>
					</div><div className={style.validationText}>{validMessage.reserve}</div>

					<div className={style.calendarIcon} />
					<label htmlFor={"dateRange"}>Start Date / End Date</label><br />
					<DatePicker
						value={selectedDayRange}
						onChange={setSelectedDayRange}
						inputClassName={style.yearInput}
						inputPlaceholder="from DD/MM/YYYY to DD/MM/YYYY"
						colorPrimary={currentThemeColor}
						colorPrimaryLight="rgba(75, 207, 250, 0.4)"
						shouldHighlightWeekends
					/>
					<div className={style.validationText}>{validMessage.dateRange}</div>

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


export default ProjectDetails;