import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import style from "./Main.module.css";

import Pages from "./Pages";
import Breadcrumbs from "./Breadcrumbs";

export default class Main extends React.PureComponent {

	renderRoutes(screens) {
		return screens.map((screen, i) => {
			if(screen.items && screen.items.length > 0 && !screen.component) {
				return this.renderRoutes(screen.items);
			}

			if(screen.items && screen.items.length > 0 && screen.component) {
				const Component = Pages[screen.component];

				<Route path={screen.route} element={
					<>
						{Pages[screen.component] ? <Component /> : null}
						<Outlet />
					</>
				}>
					{this.renderRoutes(screen.items)}
				</Route>;
			}

			if(screen.component) {
				const Component = Pages[screen.component];

				return (
					<Route path={screen.route} element={Pages[screen.component] ? <Component /> : null} />
				);
			}

			return null;
		});
	}

	render() {
		const { screens = [], workspace = {} } = this.props;

		return (
			<main id={style.main}>
				{/* <Breadcrumbs screens={screens} workspace={workspace} /> */}
				<Routes>
					{this.renderRoutes(screens)}
				</Routes>
			</main>
		);
	}
}
