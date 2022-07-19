import React from "react";
import { Link, useLocation } from "react-router-dom";

import style from "./Sidebar.module.css";

import Icon from "../Icon";

import SubSidebar from "./SubSidebar";
import WorkspaceNav from "./WorkspaceNav/WorkspaceNav";

export default function Sidebar(props) {
	const { workspaceIcon, workspaceProjects, workspaceTitle, screens } = props;
	const location = useLocation();

	const renderNavLinks = () => {
		if(!screens) return;

		return screens.map((screenObj) => {

			return (
				<li key={screenObj.route} className={location.pathname.includes(screenObj.route) ? style.activeLink : ""}>
					<Link to={screenObj.route} state={{ workspaceTitle, pageTitle: screenObj.label, screens }}>
						<Icon icon={screenObj.icon} />
					</Link>
				</li>
			);
		});
	};

	const renderSubSidebar = () => {
		if(!screens) return null;

		const { user } = props;
		const screenObj = screens.find((screenObj) => location.pathname.includes(screenObj.route));

		if(!screenObj) return;

		return (
			<SubSidebar
				pathname={location.pathname}
				key={screenObj.route}
				subNavMenu={screenObj.route}
				subNavLinks={screenObj.items}
				workspaceProjects={workspaceProjects}
				workspaceTitle={workspaceTitle}
				pageTitle={screenObj.label}
				user={user}
			/>
		);
	};

	return (
		<div id={style.sidebarContainer}>
			<WorkspaceNav />
			<div className={style.flexRowContainer}>
				<nav id={style.sidebar}>
					<div>
						{workspaceIcon}
					</div>
					<ul>
						{renderNavLinks()}
					</ul>
					<Link to="/profile">
						<Icon icon="cog-dark" />
					</Link>
				</nav>
				{renderSubSidebar()}
			</div>
		</div>
	);
}
