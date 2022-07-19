import style from "../CreateBusiness.module.css";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import CurrencyCodes from "../../../assets/data/money-currency.json";

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

const AddGoods = () => {
	const [search, setSearch] = useState("");
	const [name, setName] = useState("");
	const [costPrice, setCostPrice] = useState({
		currency: "USD",
		amount: ""
	});
	const [sellPrice, setSellPrice] = useState({
		currency: "USD",
		amount: ""
	});
	const [uom, setUom] = useState("0");
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
		if (costPrice.length === 0){
			message.costPrice = "Please fill out this field";
		}
		if (sellPrice.length === 0){
			message.sellPrice = "Please fill out this field";
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
				break;
			case "name":
				setName(value.trim());
				delete message.name;
				break;
			case "costPriceCurrency":
				setCostPrice({
					...costPrice,
					currency: value.trim()
				});
				delete message.costPrice;
				break;
			case "costPriceAmount":
				setCostPrice({
					...costPrice,
					amount: value.replace(/[A-Za-z]|`|=|_|&|%|#|@|>|</gm, "").trim()
				});
				delete message.costPrice;
				break;
			case "sellPriceCurrency":
				setSellPrice({
					...sellPrice,
					currency: value.trim()
				});
				delete message.sellPrice;
				break;
			case "sellPriceAmount":
				setSellPrice({
					...sellPrice,
					amount: value.replace(/[A-Za-z]|`|=|_|&|%|#|@|>|</gm, "").trim()
				});
				delete message.sellPrice;
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

	let currencyOptions = CurrencyCodes
		.map( codes => <CurrencyOptions key={codes.key} keys={codes.key} name={codes.name} currency={codes.currency}/>);


	return (
		<div className={style.mainContent}>
			<div className={style.formBlock}>
				<form onSubmit={sendDates} className={style.form}>
					<input type={"text"} autoComplete="off" className={`${style.searchInput} ${validMessage.search ? style.invalidInput : ""}`} placeholder={"Enter a good name, field, etc "} value={search} name="search" onChange={onChangeTextInput}/>
					<button type="button" className={style.searchBTN} title="Search"><div className={style.searchIcon}/></button><br />
					<div className={style.validationText}>{validMessage.search}</div>

					<label htmlFor={"name"}>Name</label><br />
					<input type={"text"} className={validMessage.name ? style.invalidInput : ""} placeholder={"Enter goods name"} value={name} name="name" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.name}</div>

					<div className={style.moneyInput}>
						<label htmlFor={"costPrice"}>Cost Price</label><br />
						<div className={style.dollarIcon}/>
						<select className={style.selectCurrency} name="costPriceCurrency" value={costPrice.currency} onChange={onChangeTextInput}>
							{currencyOptions}
						</select>
						<input type={"text"} placeholder={"Enter cost price"} name="costPriceAmount" value={costPrice.amount}  onChange={onChangeTextInput}/>
					</div><div className={style.validationText}>{validMessage.costPrice}</div>

					<div className={style.moneyInput}>
						<label htmlFor={"sellPrice"}>Sell Price</label><br />
						<div className={style.dollarIcon}/>
						<select className={style.selectCurrency} name="sellPriceCurrency" value={sellPrice.currency} onChange={onChangeTextInput}>
							{currencyOptions}
						</select>
						<input type={"text"} placeholder={"Enter sell price"} name="sellPriceAmount" value={sellPrice.amount}  onChange={onChangeTextInput}/>
					</div><div className={style.validationText}>{validMessage.sellPrice}</div>

					<label htmlFor={"uom"}>Units of Measurement</label><br />
					<select className={`${style.selectUOM} ${validMessage.uom ? style.invalidInput : ""} ${uom === "0" ? style.noneSelect : ""}`} value={uom} name="uom" onChange={onChangeTextInput}>
						<option value="0" className={style.disabledOption}>Select UoM</option>
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
					</select><br />
					<div className={style.validationText}>{validMessage.uom}</div>

					<label htmlFor={"description"}>Description</label><br />
					<textarea className={`${validMessage.description ? style.invalidInput : ""} ${style.textarea}`} placeholder="Enter a description..." value={description} name="description" onChange={onChangeTextInput}/><br />
					<div className={style.validationText}>{validMessage.description}</div>

					<button type="submit" className={style.continueBTN}>Add</button>
				</form>
			</div>
		</div>
	);
};

export default AddGoods;