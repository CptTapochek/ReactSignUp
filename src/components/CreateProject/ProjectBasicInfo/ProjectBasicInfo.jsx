import style from "../CreateProject.module.css";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


const ProjectBasicInfo = () => {
	const [title, setTitle] = useState("NextLogic");
	const [category, setCategory] = useState("0");
	const [subcategory, setSubcategory] = useState("0");
	const [privacy, setPrivacy] = useState("");
	const [reference, setReference] = useState("");
	const [description, setDescription] = useState("");
	const [validMessage, setValidMessage] = useState({});
	const navigate = useNavigate();

	const sendDates = async (e) => {
		e.preventDefault();

		/* Validation */
		let message = {};
		if (title.length < 2 || title.length > 50){
			message.title = "Please fill out this field";
		}
		if (category.length === 0){
			message.category = "Please fill out this field";
		}
		if (subcategory.length === 0){
			message.subcategory = "Please fill out this field";
		}
		if (reference.length === 0){
			message.reference = "Please fill out this field";
		}
		if (privacy.length === 0){
			message.privacy = "Please choose the project state";
		}

		if (Object.keys(message).length === 0){
			navigate("/create-project/details");
		} else {
			setValidMessage(message);
		}
	};

	const onChangeTextInput = (e) => {
		const { name, value } = e.target;
		let message = validMessage;
		switch (name) {
			case "title":
				setTitle(value.trim());
				delete message.title;
				break;
			case "category":
				setCategory(value);
				delete message.category;
				break;
			case "subcategory":
				setSubcategory(value);
				delete message.subcategory;
				break;
			case "privacy":
				setPrivacy(value);
				delete message.privacy;
				break;
			case "reference":
				setReference(value.replace(/[A-Za-z]|`|=|_|&|%|#|@|>|<|,/gm, "").trim());
				delete message.reference;
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


	return (
		<div className={style.mainContent}>
			<div className={style.formBlock}>
				<div className={style.mainLogo}>Create Project</div>
				<div className={style.formTitle}>Project basic info</div><br />
				<div className={style.formPrompt}>Some basic information about this new</div><br /><br /><br />
				<form onSubmit={sendDates} className={style.form}>
					<label htmlFor={"title"}>Title</label><br />
					<input type={"text"} className={validMessage.title ? style.invalidInput : ""} placeholder={"Project title"} value={title} name="title" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.title}</div>

					<label htmlFor={"category"}>Category</label><br />
					<select className={`${style.select} ${validMessage.category ? style.invalidInput : ""} ${category === "0" ? style.noneSelect : ""}`} value={category} name="category" onChange={onChangeTextInput}>
						<option value="0" className={style.disabledOption}>Choose category</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
					</select><br />
					<div className={style.validationText}>{validMessage.category}</div>

					<label htmlFor={"subcategory"}>Subcategory</label><br />
					<select className={`${style.select} ${validMessage.subcategory ? style.invalidInput : ""} ${subcategory === "0" ? style.noneSelect : ""}`} value={subcategory} name="subcategory" onChange={onChangeTextInput}>
						<option value="0" className={style.disabledOption}>Choose subcategory</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
					</select><br />
					<div className={style.validationText}>{validMessage.subcategory}</div>

					<label htmlFor={"privacy"}>Is this project private?</label><br /><br />
					<div className={style.setPrivacy}>
						<div className={style.radioButton}>
							<input type={"radio"} name="privacy" value="private" onChange={onChangeTextInput}/>
							<label htmlFor="privacy">Private</label>
						</div>
						<div className={style.radioButton}>
							<input type={"radio"} name="privacy" value="public" onChange={onChangeTextInput}/>
							<label htmlFor="privacy">Public</label>
						</div>
					</div>
					<div className={style.validationText}>{validMessage.privacy}</div>

					<label>Tags</label><br /><br/>
					<div className={style.tags}>
						<div className={style.addTag}>Add tag <div className={style.addTagIcon}/></div>
						<div className={style.tag}>example tag</div>
					</div>
					<div className={style.validationText}>{validMessage.reference}</div>

					<label htmlFor={"reference"}>Internal Reference</label><br />
					<input type={"text"} className={`${validMessage.reference ? style.invalidInput : ""}`} placeholder={"Reference number"} value={reference} name="reference" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.reference}</div>

					<label htmlFor={"description"}>Description</label><br />
					<textarea className={`${validMessage.description ? style.invalidInput : ""} ${style.textarea}`} value={description} name="description" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.description}</div>


					<button type="submit" className={style.continueBTN}>Next</button>
				</form>
			</div>
		</div>
	);
};

export default ProjectBasicInfo;