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
				<Route path={"/details"} element={
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
				<Route path={"/subproject"} element={
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
					<div className={style.action_title}>Basic info</div>
					<div className={style.action_description}>Some basic information of this project</div>
				</div>
				<div className={style.block}>
					<div className={style.action_title}>Details</div>
					<div className={style.action_description}>Users, Resources, Budget...</div>
				</div>
				<div className={style.block}>
					<div className={style.action_title}>Tasks</div>
					<div className={style.action_description}>Create or upload every task of this project</div>
				</div>
			</div>
		</div>
	);
};

export default SideBarInfo;