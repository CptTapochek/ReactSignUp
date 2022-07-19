import style from "../SignUp.module.css";
import SignUpSuccessImage from "../../../assets/icons/signup-success-big.svg";
import {NavLink} from "react-router-dom";
import React from "react";

class SuccessPopUp extends React.PureComponent {
	render(){
		return (
			<div className={style.pop_up_block} id={"PopUpSignUpSuccess"}>
				<div className={style.pop_up_black_background} />
				<div className={style.pop_up_container}>
					<div className={style.modal_features}>
						<div className={style.modal_status}>Well done</div>
						<div className={style.modal_title}>Awesome</div>
						<div className={style.modal_description}>Looks like you’re doing great. Now you can explore the platform and complete your Requester and Provider details</div>
						<NavLink to={"/home"} className={style.modal_button}>Take me home</NavLink>
					</div>
					<div className={style.modal_image}>
						<img src={SignUpSuccessImage}/>
					</div>
				</div>
			</div>
		);
	}
}

export default SuccessPopUp;