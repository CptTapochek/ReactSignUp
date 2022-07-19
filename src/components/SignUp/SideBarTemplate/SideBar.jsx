import style from "../../FormSideBar/FormSideBar.module.css";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Tick from "../../../assets/icons/tick-blue.svg";

const SideBarInfo = () => {
	return (
		<div className={style.activities_tree}>
			<Routes>
				<Route path={"/"} element={
					<div className={style.shape_forms}>
						<div className={style.action}>
							<div className={style.active_circle}><div /></div>
						</div>
						<div className={style.line} />
						<div className={style.action}>
							<div className={style.circle}><div /></div>
						</div>
						<div className={style.line} />
						<div className={style.action}>
							<div className={style.circle}><div /></div>
						</div>
					</div>
				}/>
				<Route path={"/choose-password"} element={
					<div className={style.shape_forms}>
						<div className={style.action}>
							<div className={style.tick_circle}><img src={Tick}/></div>
						</div>
						<div className={style.line} />
						<div className={style.action}>
							<div className={style.active_circle}><div /></div>
						</div>
						<div className={style.line} />
						<div className={style.action}>
							<div className={style.circle}><div /></div>
						</div>
					</div>
				}/>
				<Route path={"/personal-details"} element={
					<div className={style.shape_forms}>
						<div className={style.action}>
							<div className={style.tick_circle}><img src={Tick}/></div>
						</div>
						<div className={style.line} />
						<div className={style.action}>
							<div className={style.tick_circle}><img src={Tick}/></div>
						</div>
						<div className={style.line} />
						<div className={style.action}>
							<div className={style.active_circle}><div /></div>
						</div>
					</div>
				}/>
			</Routes>
			<div className={style.text_information}>
				<div className={style.block}>
					<div className={style.action_title}>User details</div>
					<div className={style.action_description}>Please provide your name and email</div>
				</div>
				<div className={style.block}>
					<div className={style.action_title}>Choose a password</div>
					<div className={style.action_description}>Choose a secure password</div>
				</div>
				<div className={style.block}>
					<div className={style.action_title}>Personal details</div>
					<div className={style.action_description}>Start collaborating with your team</div>
				</div>
			</div>
		</div>
	);
};

export default SideBarInfo;