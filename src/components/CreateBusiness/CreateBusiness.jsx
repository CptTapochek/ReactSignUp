import style from "./CreateBusiness.module.css";
import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import BasicInfo from "./BusinessBasicInfo/BusinessBasicInfo";
import Identifiers from "./BusinessIdentifiers/BusinessIdentifiers";
import Inventory from "./Inventory/Inventory";
import SideBarInfo from "./SideBarTemplate/SideBar";
import FormSideBar from "../FormSideBar/FormSideBar";

const CreateBusiness = () => {
	const [darkScreen, setDarkScreen] = useState("");

	const dropDarkScreen = () => {
		setDarkScreen(null);
	};

	return (
		<div className={style.completionForm} onMouseOver={dropDarkScreen}>
			{darkScreen}
			<FormSideBar url={"create-business"}>
				<SideBarInfo />
			</FormSideBar>
			<Routes>
				<Route path={"/"} element={<BasicInfo/>}/>
				<Route path={"/identifiers"} element={<Identifiers setDarkScreen={setDarkScreen}/>}/>
				<Route path={"/inventory/*"} element={<Inventory setDarkScreen={setDarkScreen}/>}/>
			</Routes>
		</div>
	);
};

export default CreateBusiness;