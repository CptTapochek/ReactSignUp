import style from "./SignUp.module.css";
import FormSideBar from "../FormSideBar/FormSideBar";
import SignUpForm from "./SignUpForm/SignUpForm";
import ChoosePass from "./ChoosePass/ChoosePass";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import {Route, Routes} from "react-router-dom";
import React, {useState} from "react";
import SideBarInfo from "./SideBarTemplate/SideBar";

const SignUp = () => {
	const [name, setName] = useState("");
	const [pass, setPass] = useState("");
	const [successPopUp, setPopUp] = useState("");
	const [smallSuccessPopUp, setSmallPopUp] = useState("");

	return (
		<div>
			{successPopUp}
			{smallSuccessPopUp}
			<div className={style.completionForm}>
				<FormSideBar url={"sign-up"}>
					<SideBarInfo />
				</FormSideBar>
				<Routes>
					<Route path={"/"} element={<SignUpForm setName={setName}/>}/>
					<Route path={"/choose-password"} element={<ChoosePass setPass={setPass} name={name}/>}/>
					<Route path={"/personal-details"} element={<PersonalDetails name={name} pass={pass} setPopUp={setPopUp} setSmallPopUp={setSmallPopUp}/>}/>
				</Routes>
			</div>
		</div>
	);
};

export default SignUp;