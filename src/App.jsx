import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Components from "./components";

import "./styles/main.css";

const workspaces = [
	{
		workspaceTitle: "SantierLaTara",
		workspaceIcon: "",
		workspaceProjects: [
			{
				title: "Build Buda Besides Cusca Cainelui"
			},
			{
				title: "Plant Trees Near Buda"
			},
			{
				title: "Enjoy Shitting in Nature"
			}
		]
	}
];

const user = {
	firstName: "Olărit",
	lastName: "Cu Brad Pitt",
	email: "olarim@allaround.com"
};

function App() {
	const navigate = useNavigate();
	const [screens, setScreens] = useState(
		[
			{
				route: "dashboard",
				label: "Dashboard",
				icon: "dashboard",
				items: [
					{
						route: "/dashboard/overview",
						label: "Overview",
						icon: "line-chart",
						component: "DashboardOverview"
					},
					{
						route: "/dashboard/notifications",
						label: "Notifications",
						icon: "bell",
						notificationCount: 12,
						component: "DashboardNotifications"
					},
					{
						route: "/dashboard/activities",
						label: "Activities",
						icon: "bar-chart",
						component: "DashboardActivities"
					},
					{
						route: "/dashboard/saved-tasks",
						label: "Saved tasks",
						icon: "star-empty",
						component: "DashboardSavedTasks"
					},
					{
						route: "/dashboard/scheduled-reports",
						label: "Scheduled reports",
						icon: "clock",
						component: "DashboardScheduledReports"
					},
					{
						route: "/dashboard/user-reports",
						label: "User reports",
						icon: "user",
						component: "DashboardUserReports"
					},
					{
						route: "/dashboard/manage-notifications",
						label: "Manage notifications",
						icon: "cog-light",
						component: "DashboardManageNotifications"
					}
				]
			},
			{
				route: "projects",
				label: "Projects",
				icon: "folder-dark",
				items: [
					{
						route: "/projects/overview",
						label: "Overview",
						icon: "bar-chart"
					},
					{
						route: "/projects/LinkQuip",
						label: "LinkQuip",
						icon: "folder-light",
						component: "Projects"
					},
					{
						route: "/projects/Ratify",
						label: "Ratify",
						icon: "folder-light",
						component: "Projects"
					},
					{
						route: "/projects/Makesure",
						label: "Makesure",
						icon: "folder-light",
						component: "Projects"
					}
				]
			},
			{
				route: "works",
				label: "Works",
				icon: "helmet",
				items: [
					{
						route: "/works/linkquip-design",
						label: "Linkquip Design",
						icon: "helmet",
						component: "Works"
					}
				]
			},
			{
				route: "calendar",
				label: "Calendar",
				icon: "calendar",
				items: []
			},
			{
				route: "marketplace",
				label: "Marketplace",
				icon: "marketplace",
				items: []
			},
			{
				route: "chat",
				label: "Chat",
				icon: "chat",
				items: []
			},
		]
	);

	// useEffect(() => {
	// 	navigate("/dashboard", {
	// 		state: {
	// 			workspaceTitle: workspaces[0].workspaceTitle,
	// 			pageTitle: "Dashboard",
	// 			screens
	// 		}
	// 	});
	// }, []);

	return (
		<div id="app">
			<Routes>
				<Route path="/sign-up/*" element={<Components.SignUp/>} />
				<Route path="/login/*" element={<Components.Login/>} />
				<Route path="/create-business/*" element={<Components.CreateBusiness/>} />
				<Route path="/create-project/*" element={<Components.CreateProject/>} />
				<Route path="*" element={
					<>
						<Components.Sidebar {...workspaces[0]} screens={screens} user={user} />
						<Components.Main screens={screens} workspace={workspaces[0]} />
					</>
				} />
			</Routes>
		</div>
	);
}

export default App;
