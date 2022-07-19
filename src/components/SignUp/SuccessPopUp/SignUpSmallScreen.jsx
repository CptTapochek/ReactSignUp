import style from "../SignUp.module.css";
import SignUpSuccessImage from "../../../assets/icons/signup-success-small.svg";
import {NavLink} from "react-router-dom";
import React from "react";

class SmallScreenSuccess extends React.PureComponent {
	render(){
		return (
			<div className={style.success_block} id={"SignUpSuccessSmallScreen"}>
				<div className={style.success_block_image}>
					<img src={SignUpSuccessImage}/>
				</div>
				<div className={style.success_title}>Awesome</div>
				<div className={style.success_description}>Looks like you’re doing great. Now you can explore the platform and complete your Requester and Provider details</div>
				<NavLink to={"/home"} className={style.success_button}>Take me home</NavLink>
			</div>
		);
	}
}

export default SmallScreenSuccess;