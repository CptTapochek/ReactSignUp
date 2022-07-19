import React from "react";

import {NavLink} from "react-router-dom";

import style from "./DashboardOverview.module.css";

import Icon from "../../../Icon";

export default class DashboardOverview extends React.PureComponent {

	render() {
		return (
			<div id={style.dashboardOverview}>
				<section className={style.topSection}>
					<h1>Welcome Orlando!</h1>
					<div>
						<Icon icon="search" />
						<input placeholder="Search" />
					</div>
				</section>
				<section className={style.mainSection}>
					<div className={style.emptyState}>
						<Icon icon="cloud-big" />
						<div>
							<h3>No projects found</h3>
							<p>No analytics to be displayed due to lack of projects</p>
						</div>
						<NavLink to="/create-project"><Icon icon="plus" /><span>Create project</span></NavLink>
					</div>
				</section>
			</div>	
		);
	}
}