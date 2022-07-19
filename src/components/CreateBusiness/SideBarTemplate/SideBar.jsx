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
				<Route path={"/identifiers"} element={
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
				<Route path={"/inventory/*"} element={
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
					<div className={style.action_title}>Business basic info</div>
					<div className={style.action_description}>Some basic information about your business</div>
				</div>
				<div className={style.block}>
					<div className={style.action_title}>Business identifiers + Docs</div>
					<div className={style.action_description}>Upload legal documentation</div>
				</div>
				<div className={style.block}>
					<div className={style.action_title}>Inventory</div>
					<div className={style.action_description}>Upload equipment inventory</div>
				</div>
			</div>
		</div>
	);
};

export default SideBarInfo;