import React from "react";

import style from "./WorkspaceNav.module.css";

import Icon from "../../Icon";

export default class WorkspaceNav extends React.PureComponent {
	render() {
		return (
			<header id={style.workspaceNav}>
				<div className={style.workspaceNavIdentifiers}>
					<h2>Workspace Title</h2>
					<span>Business</span>
				</div>
				<button className={style.workspaceNavButton} >
					<Icon icon="arrows-up-down" />
				</button>
			</header>
		);
	}
}