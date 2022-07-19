import style from "../CreateBusiness.module.css";
import React, {useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import AddEquipment from "../AddEquipment/AddEquipment";
import AddService from "../AddService/AddService";
import AddGoods from "../AddGoods/AddGoods";


const Inventory = ({setDarkScreen}) => {
	const [addType, setAddType] = useState("");
	const [dropDownMenu, setDropDownMenu] = useState("");
	const navigate = useNavigate();

	const mainClickEvent = () => {
		if (dropDownMenu){
			setDropDownMenu("");
		}
	};

	const onChangeAddType = (event) => {
		event ? setAddType(event) : "";
		mainClickEvent();
		switch (event){
			case "Equipment":
				navigate("/create-business/inventory/add-equipment");
				break;
			case "Service":
				navigate("/create-business/inventory/add-service");
				break;
			case "Goods":
				navigate("/create-business/inventory/add-goods");
				break;
			default:
				navigate("/create-business/inventory");
				break;
		}
	};

	const DropDownMenu = () => {
		return (
			<div className={style.dropDownMenu}>
				<div className={style.item} onClick={()=>onChangeAddType("Equipment")}>
					<div className={style.menuIcon}><div className={style.addEquipmentIcon}/></div>
					<div className={style.menuTitle}>Add equipment</div>
				</div>
				<div className={style.item} onClick={()=>onChangeAddType("Service")}>
					<div className={style.menuIcon}><div className={style.addServiceIcon}/></div>
					<div className={style.menuTitle}>Add service</div>
				</div>
				<div className={style.item} onClick={()=>onChangeAddType("Goods")}>
					<div className={style.menuIcon}><div className={style.addGoodsIcon}/></div>
					<div className={style.menuTitle}>Add goods</div>
				</div>
			</div>
		);
	};

	const dropDownMenuEvent = () => {
		setDropDownMenu(DropDownMenu);
	};

	return (
		<div className={style.mainContent} onClick={mainClickEvent}>
			<div className={style.formBlock}>
				<div className={style.mainLogo}>Create Business</div>
				<div className={style.formTitle}>Inventory</div><br />
				<div className={style.formPrompt}>Provide following information</div><br /><br /><br />
				<form  className={style.form}>
					<div className={style.customDropDownMenu}>
						<div className={style.dropDownButton} onClick={dropDownMenuEvent}>
							<div className={`${style.buttonTitle} ${addType ? style.blackText : ""}`}>{addType ? addType : "What do you want to add?"}</div>
							<div className={style.arrow}/>
						</div>
						{dropDownMenu}
					</div>
				</form>
			</div>
			<Routes>
				<Route path={"/add-equipment"} element={<AddEquipment setDarkScreen={setDarkScreen}/>}/>
				<Route path={"/add-service"} element={<AddService/>}/>
				<Route path={"/add-goods"} element={<AddGoods/>}/>
			</Routes>
		</div>
	);
};

export default Inventory;