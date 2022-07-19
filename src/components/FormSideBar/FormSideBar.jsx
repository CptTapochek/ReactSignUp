import style from "./FormSideBar.module.css";
import LogoIcon from "../../assets/icons/logo-big.svg";
import React from "react";
import {useNavigate} from "react-router-dom";

const FormSideBar = (props) => {
	const navigate = useNavigate();
	const cancelCurrentAction = () => {
		navigate("/dashboard");
	};

	const TopContent = () => {
		let cancelButton = (
			<div className={style["side-bar__logo"]}><button onClick={cancelCurrentAction} className={style.cancelButton}>Cancel</button></div>
		);
		let mainLogo = (
			<div className={style["side-bar__logo"]}>
				<img src={LogoIcon}/>
				<div className={style.__logo__title}>
					LOGO
				</div>
			</div>
		);
		return props.url === "sign-up" ? mainLogo : cancelButton;
	};
	
	return (
		<div className={style["side-bar"]}>
			<TopContent/>
			{props.children}
			<div className={style.block}></div>
			<div className={style.sidebar_footer}>
				<div className={style.copyright}>© PCM {new Date(Date.now()).getFullYear()}</div>
				<div className={style.company_email}> help@pcm.com</div>
			</div>
		</div>
	);
};

export default FormSideBar;