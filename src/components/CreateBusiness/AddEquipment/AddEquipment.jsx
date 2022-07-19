import style from "../CreateBusiness.module.css";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import DatePicker from "react-modern-calendar-datepicker";

let currentThemeColor = "#36A0C9";

/* Get input documents */
const AddedImage = (props) => {
	const [counter, setCounter] = React.useState(0);
	React.useEffect(() => {
		if (props.animation === true){
			counter < 100 && setTimeout(() => setCounter(counter + 1), 17);
		} else {
			setCounter(100);
		}
	}, [counter]);

	/* Stop animation */
	if (counter === 100){
		let files = props.selectedImage;
		for (let file of files){
			if (file.name === props.name){
				file.animation = false;
			}
		}
	}

	/* getImageUrl */
	let imageUrl;
	for (let img of props.imageUrl){
		if (img.name === props.name){
			imageUrl = img.url;
		}
	}

	return (
		<div className={style.imagePreview}>
			<img src={imageUrl} className={style.equipmentImage}/>
			<div className={style.rightImageBlock}>
				<div className={style.imgTopBlock}>
					<div className={style.imgTextBlock}>
						<div className={style.documentTitle}>{props.name}</div>
						<div className={style.documentSize}>
							{convertSize(props.size)}
						</div>
					</div>
					<div className={style.documentDelete} document={props.name} onClick={props.deleteImage} title="Delete"/>
				</div>
				<div className={style.imgLoadingStatus}>
					<div className={style.loadingBar}>
						<div className={`${style.loadingBarBlue} ${props.animation === true ? style.animateLoading : ""}`}/>
						<div className={style.loadingBarDisabled}/>
					</div>
					<div className={style.loadingProcent}>{counter}%</div>
				</div>
			</div>
		</div>
	);
};

const AddEquipment = ({setDarkScreen}) => {
	const [name, setName] = useState("NextLogic");
	const [search, setSearch] = useState("");
	const [manufacturer, setManufacturer] = useState("");
	const [model, setModel] = useState("");
	const [selectedDay, setSelectedDay] = useState();
	const [quantity, setQuantity] = useState("");
	const [uom, setUom] = useState("0");
	const [description, setDescription] = useState("");
	const [validMessage, setValidMessage] = useState({});
	const [selectedImage, setSelectedImage] = useState([]);
	const [imageUrl, setImageUrl] = useState([]);
	const navigate = useNavigate();

	const sendDates = async (e) => {
		e.preventDefault();

		/* Validation */
		let message = {};
		if (name.length < 2 || name.length > 50){
			message.name = "Please fill out this field";
		}
		if (manufacturer.length === 0){
			message.manufacturer = "Please fill out this field";
		}
		if (model.length === 0){
			message.model = "Please fill out this field";
		}
		if (quantity.length === 0){
			message.quantity = "Please fill out this field";
		}
		if (uom.length === 0){
			message.uom = "Please fill out this field";
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
		switch (name) {
			case "search":
				setSearch(value.trim());
				delete message.search;
				break;
			case "name":
				setName(value.trim());
				delete message.name;
				break;
			case "manufacturer":
				setManufacturer(value.trim());
				delete message.manufacturer;
				break;
			case "model":
				setModel(value.trim());
				delete message.model;
				break;
			case "quantity":
				setQuantity(value.replace(/[A-Za-z]|`|=|_|&|%|#|@|>|<|,/gm, "").trim());
				delete message.quantity;
				break;
			case "uom":
				setUom(value);
				delete message.uom;
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

	/* Add equipment photos */
	useEffect(() => {
		if (selectedImage.length > 0) {
			let existFiles = imageUrl;
			for (let element of selectedImage){
				if (existFiles.filter(e => e.size === element.size && e.name === element.name).length === 0){
					existFiles.push({url: URL.createObjectURL(element), name: element.name, size: element.size});
				}
			}
			setImageUrl(existFiles);
		}
	}, [selectedImage.length]);

	/* Set uploaded documents */
	const addImage = (e) => {
		let files = selectedImage;
		for (let i = 0; i < e.target.files.length; i++){
			e.target.files[i].animation = true;
			let fileName = e.target.files[i].name.split(".").pop();
			let allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
			for (let extension of allowedExtensions){
				if (fileName === extension){
					files.push(e.target.files[i]);
				}
			}
		}
		setSelectedImage(files);
		setDarkScreen("");
	};

	const dragImage = () => {
		const DarkScreen = () =>{
			return (<div className={style.darkenedScreen}/>);
		};
		setDarkScreen(<DarkScreen/>);
	};

	const deleteImage = (e) => {
		let existDocuments = selectedImage;
		let existDocsUrl = imageUrl;

		for (let i = 0; i < existDocuments.length; i++){
			if (existDocuments[i].name === e.target.getAttribute("document")){
				existDocuments.splice(i, 1);
				existDocsUrl.splice(i, 1);
			}
		}
		setSelectedImage([...existDocuments]);
		setImageUrl([...existDocsUrl]);
	};


	let imageElements = "";
	if (imageUrl.length > 0 && selectedImage.length > 0){
		const getRandomInt = (max) => {
			return Math.floor(Math.random() * max);
		};
		imageElements = selectedImage
			.map( file => <AddedImage
				key={file.size + getRandomInt(1000)}
				animation={file.animation}
				name={file.name} imageUrl={imageUrl}
				ext={file.name.split(".").pop()}
				size={file.size}
				deleteImage={deleteImage}
				setSelectedImage={setSelectedImage}
				selectedImage={selectedImage}
			/>);
	}

	return (
		<div className={style.mainContent} onDragEnter={dragImage}>
			<div className={style.formBlock}>
				<form onSubmit={sendDates} className={style.form}>
					<input type={"text"} autoComplete="off" className={`${style.searchInput} ${validMessage.search ? style.invalidInput : ""}`} placeholder={"Enter a machine name, manufacturer or model"} value={search} name="search" onChange={onChangeTextInput}/>
					<button type="button" className={style.searchBTN} title="Search"><div className={style.searchIcon}/></button><br />
					<div className={style.validationText}>{validMessage.search}</div>

					<label htmlFor={"name"}>Name</label><br />
					<input type={"text"} className={validMessage.name ? style.invalidInput : ""} placeholder={"Enter name"} value={name} name="name" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.name}</div>

					<label htmlFor={"manufacturer"}>Manufacturer</label><br />
					<input type={"text"} className={validMessage.manufacturer ? style.invalidInput : ""} placeholder={"Enter manufacturer"} value={manufacturer} name="manufacturer" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.manufacturer}</div>

					<label htmlFor={"model"}>Model</label><br />
					<input type={"text"} className={validMessage.model ? style.invalidInput : ""} placeholder={"Enter model"} value={model} name="model" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.model}</div>

					<div className={style.yearInputBlock}>
						<label htmlFor={"yearInput"}>Year</label>
						<div className={style.calendarIcon} />
						<DatePicker
							value={selectedDay}
							onChange={setSelectedDay}
							inputClassName={style.yearInput}
							inputPlaceholder="DD/MM/YYYY"
							colorPrimary={currentThemeColor}
							calendarClassName={"inputDateCalendar"}
							colorPrimaryLight="rgba(75, 207, 250, 0.4)"
							shouldHighlightWeekends
						/>
						<div className={style.dataValidateText}>{validMessage.datePicker}</div>
					</div><br />

					<label htmlFor={"quantity"}>Quantity</label><br />
					<input type={"text"} className={validMessage.quantity ? style.invalidInput : ""} placeholder={"Enter quantity"} value={quantity} name="quantity" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.quantity}</div>

					<label htmlFor={"uom"}>Units of Measurement</label><br />
					<select className={`${style.selectUOM} ${validMessage.uom ? style.invalidInput : ""} ${uom === "0" ? style.noneSelect : ""}`} value={uom} name="uom" onChange={onChangeTextInput}>
						<option value="0" className={style.disabledOption}>Select UoM</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
					</select><br />
					<div className={style.validationText}>{validMessage.uom}</div>

					<label htmlFor={"description"}>Description</label><br />
					<textarea className={`${validMessage.description ? style.invalidInput : ""} ${style.textarea}`} value={description} name="description" onChange={onChangeTextInput} placeholder={"Enter a description..."}/><br />
					<div className={style.validationText}>{validMessage.description}</div>

					<div className={style.uploadDocumentBlock}>
						<div className={style.uploadPhotosTitle}>Upload Photos</div>
						<label className={style.documentLabel}>
							<input
								accept="image/*"
								type="file"
								id="select-image"
								multiple
								onChange={addImage}
							/>
							<div className={style.uploadImage}/><br/>
							<div className={style.uploadText}><span>Click to upload</span> or drag and drop</div>
							<div className={style.uploadTextPrompt}>SVG, PNG, JPG or GIF (max. 800x400px)</div>
						</label><br/>
						{imageElements}
					</div>

					<button type="submit" className={style.continueBTN}>Add</button>
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

export default AddEquipment;