import style from "./CreateProject.module.css";
import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import ProjectBasicInfo from "./ProjectBasicInfo/ProjectBasicInfo";
import ProjectDetails from "./ProjectDetails/ProjectDetails";
import Subproject from "./Subproject/Subproject";
import SideBarInfo from "./SideBarTemplate/SideBar";
import FormSideBar from "../FormSideBar/FormSideBar";

const CreateProject = () => {
	const [darkScreen, setDarkScreen] = useState("");

	const dropDarkScreen = () => {
		setDarkScreen("");
	};

	return (
		<div className={style.completionForm} onMouseOver={dropDarkScreen}>
			{darkScreen}
			<FormSideBar url={"create-project"}>
				<SideBarInfo />
			</FormSideBar>
			<Routes>
				<Route path={"/"} element={<ProjectBasicInfo/>}/>
				<Route path={"/details"} element={<ProjectDetails
					setDarkScreen={setDarkScreen}
					darkScreen={darkScreen}
				/>}/>
				<Route path={"/subproject"} element={<Subproject/>}/>
			</Routes>
		</div>
	);
};

export default CreateProject;