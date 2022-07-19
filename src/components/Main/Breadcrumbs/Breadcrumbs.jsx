import React, { useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import style from "./Breadcrumbs.module.css";

function renderDropdownLinks(screens, currentPath) {
	return (
		screens.map((element, i) => {
			if(currentPath.includes(element.route)) return null;

			return (
				<li key={element.route + i}>
					<Link to={element.route}>{element.label}</Link>
				</li>
			);
		})
	);
}

function Breadcrumbs({ screens = [], workspace = {} }) {
	const detailsRef = useRef();
	const { pathname = "" } = useLocation();

	useEffect(() => {
		document.addEventListener("click", function(e) {
			if(detailsRef.current && detailsRef.current.contains(e.target)) return;

			detailsRef.current.removeAttribute("open");
		});
	});

	return (
		<nav id={style.breadcrumbs}>
			<h3>{workspace.workspaceTitle}</h3>
			<details ref={detailsRef}>
				<summary>Placeholder</summary>
				<ul style={{ position: "absolute" }}>
					{renderDropdownLinks(screens, pathname)}
				</ul>
			</details>
		</nav>
	);
}

const MemoizedBreadcrumbs = React.memo(Breadcrumbs);
export default MemoizedBreadcrumbs;
