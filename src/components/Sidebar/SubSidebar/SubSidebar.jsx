import React from "react";
import { Link } from "react-router-dom";

import style from "./SubSidebar.module.css";

import Icon from "../../Icon";

const screens = ["dashboard", "projects", "calendar", "marketplace", "chat"];

export default class SubSidebar extends React.PureComponent {

	renderSubNavLinks() {
		const { workspaceTitle = "", subNavLinks = [], pageTitle = "", pathname = "" } = this.props;

		if(subNavLinks.length === 0) return null;

		return subNavLinks.map((link) => {
			return (
				<li key={link.route} className={pathname.includes(link.route) ? style.activeLink : ""}>
					<Link to={link.route} state={{ workspaceTitle, pageTitle, paths: screens }}>
						<p><span><Icon icon={link.icon} /></span>{link.label}</p>
						{link.notificationCount ? <span>{link.notificationCount}</span> : null}
					</Link>
				</li>
			);
		});
	}

	render() {
		const { subNavMenu = "", subNavLinks = [], user = {} } = this.props;

		return subNavLinks.length > 0 ? (
			<div id={style.navMenuSub} className={style.navMenuSubOpen}>
				<h1>{subNavMenu}</h1>
				<ul>
					{this.renderSubNavLinks()}
				</ul>
				<div id={style.profileContainer}>
					<div>
						<h3>{user.firstName} {user.lastName}</h3>
						<p>{user.email}</p>
					</div>
					<button>
						<Icon icon="logout" />
					</button>
				</div>
			</div>
		) : null;
	}
}
