import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./Projects.module.css";

const GetTaskList = (props) => {
	const inputTaskDescription = () => {
		let task = {
			title: props.title,
			status: props.status,
			about: props.about,
			type: props.type,
			description: props.description
		};
		props.setTaskDescription(task);
	};

	return (
		<div className={style.tasksList} onClick={inputTaskDescription}>
			<div className={style.title}><div className={props.type === "task" ? style.taskTitleIcon : style.subprojectTitleIcon}/>{props.title}</div>
			<div className={style.status}>{props.status}</div>
			<div className={style.about}>{props.about}</div>
		</div>
	);
};

export default function Projects() {
	const [sortByName, setSortByName] = useState("");
	const [sortByStatus, setSortByStatus] = useState("");
	const [sortByAbout, setSortByAbout] = useState("");
	const [taskDescription, setTaskDescription] = useState({});
	const { pathname } = useLocation();
	const navigate = useNavigate();

	/** Temporary dates for test */
	let taskList;
	taskList = pathname.split("/")[2] === "LinkQuip" ? [
		{
			type: "subproject",
			title: "Subproject title",
			about: "About",
			key: "1",
			status: "Status",
			description: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus. Donec sollicitudin molestie malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim.\n" +
					"\n" +
					"Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Nulla porttitor accumsan tincidunt. Vivamus suscipit tortor eget felis porttitor volutpat."
		},
		{
			type: "subproject",
			title: "Subproject title",
			about: "About",
			key: "2",
			status: "Status",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus cursus id nunc senectus diam quam amet scelerisque amet. Gravida vitae risus sem massa sed in. Duis massa massa, aliquam sem felis nibh tempor nunc. Congue ipsum pharetra aliquam amet morbi ut at. Maecenas malesuada eget ultricies at malesuada massa morbi. Id suspendisse pulvinar egestas in massa tortor.\n" +
					"Magna massa adipiscing viverra condimentum. Molestie semper eu, nam a dignissim donec hendrerit. Diam elementum proin leo eget. Nec nascetur pulvinar duis vitae consectetur ac. Id in nunc mauris diam adipiscing morbi sociis.\n" +
					"Rhoncus, mattis dictum scelerisque sit at purus vitae. Donec augue blandit facilisis purus feugiat tincidunt massa sociis congue. Mi maecenas molestie at in. Tortor, feugiat amet, massa proin ornare. Et vulputate tincidunt pellentesque diam mi adipiscing integer turpis. Id amet tincidunt suscipit neque. Ut pellentesque duis lorem scelerisque. Donec nulla laoreet eget orci lacus, massa orci ipsum faucibus. Habitant phasellus ornare fames elementum aliquam lobortis tellus commodo. Et nibh et sit nec diam diam nulla. Commodo sed nisi, cursus in vel lorem ullamcorper.\n" +
					"Vel mauris aliquet malesuada arcu habitant nulla rhoncus bibendum massa. Ut adipiscing molestie eget malesuada facilisi pellentesque in. Pretium a, lectus lacus eleifend volutpat vestibulum integer sed. Proin et magna mauris at felis feugiat magna. Sagittis sagittis, sit gravida morbi metus, adipiscing in ullamcorper. Enim erat vestibulum magna tortor purus urna, non accumsan. Quisque sed purus eget at porttitor laoreet. Libero, rutrum nisi, integer interdum ac."
		},
		{
			type: "task",
			title: "Task title",
			about: "About",
			key: "3",
			status: "Status",
			description: "Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies ligula sed magna dictum porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor accumsan tincidunt."
		},
		{
			type: "task",
			title: "Task title",
			about: "About",
			key: "4",
			status: "Status",
			description: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Curabitur aliquet quam id dui posuere blandit. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Donec rutrum congue leo eget malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat."
		},
	] : [];


	const addTask = () => {
		navigate("/create-task");
	};

	const _sortByName = (e) => {
		let sortIcon = "";
		sortByName ? sortIcon = e.target.children[0].classList : "";
		if (sortIcon.length < 2){
			setSortByName(<div className={`${style.sortIcon} ${sortByName ? style.rotateIcon : ""}`}/>);
			setSortByStatus("");
			setSortByAbout("");
		} else {
			setSortByName("");
		}
	};
	const _sortByStatus = (e) => {
		let sortIcon = "";
		sortByStatus ? sortIcon = e.target.children[0].classList : "";
		if (sortIcon.length < 2){
			setSortByStatus(<div className={`${style.sortIcon} ${sortByStatus ? style.rotateIcon : ""}`}/>);
			setSortByName("");
			setSortByAbout("");
		} else {
			setSortByStatus("");
		}
	};
	const _sortByAbout = (e) => {
		let sortIcon = "";
		sortByAbout ? sortIcon = e.target.children[0].classList : "";
		if (sortIcon.length < 2){
			setSortByAbout(<div className={`${style.sortIcon} ${sortByAbout ? style.rotateIcon : ""}`}/>);
			setSortByName("");
			setSortByStatus("");
		} else {
			setSortByAbout("");
		}
	};

	let tasksAndSubprojects = taskList
		.map( key => <GetTaskList
			type={key.type}
			title={key.title}
			status={key.status}
			about={key.about}
			setTaskDescription={setTaskDescription}
			description={key.description}
			key={key.key}
		/>);

	const ListOfTasks = () => {
		return (
			<div className={style.listOfTasks}>
				<div className={style.sortTaskList}>
					<div className={style.sortButtons}>
						<button className={style.leftBtn}>View all</button>
						<button className={style.middleBtn}>Subprojects</button>
						<button className={style.rightBtn}>Tasks</button>
					</div>
					<div className={style.rightContainer}>
						<div className={style.searchInput}>
							<button className={style.searchIcon} title="Search"/>
							<input type="search" placeholder="Search"/>
						</div>
						<button><div className={style.filterIcon}/> Filters</button>
					</div>
				</div>
				<div className={style.listLegend}>
					<button className={style.sortableName} onClick={_sortByName}>Name{sortByName}</button><div className={style.space}/>
					<button onClick={_sortByStatus}>Status {sortByStatus}</button><div className={style.space}/>
					<button onClick={_sortByAbout}>About {sortByAbout}</button><div className={style.space}/>
				</div>
				{tasksAndSubprojects}
			</div>
		);
	};

	const EmptyProject = () => {
		return (
			<div className={style.emptyIllustration}>
				<div className={style.createTaskImage}/>
				<div className={style.description}>
					<h1>Start by adding a task</h1>
					<p>Currently this list is empty. You can either add a task from scratch or import one</p>
				</div>
				<div className={style.buttonsBlock}>
					<button className={style.importButton}><div className={style.importIcon}/> Import</button>
					<button onClick={addTask} className={style.addButton}><div className={style.addIcon}/> Add</button>
				</div>
			</div>
		);
	};

	const AboutTask = () => {
		/** Temporary */
		return pathname.split("/")[2] === "LinkQuip" ? (
			<div className={style.contentBlock}>
				<div className={style.selectedTaskTitle}>{taskDescription.title}</div>
				<div className={style.selectedTaskDescription}>{taskDescription.description}</div>
			</div>
		) : (<div />);
	};

	return (
		<div className={style.main}>
			<div className={style.projectTitle}>LinkQuip</div>
			<div className={style.taskList}>
				<div className={style.topBlock}>
					<div className={style.right}>
						<div className={style.taskListIcon}/>
                        List
					</div>
					<div className={style.left}>
						<button className={style.importButton}><div className={style.importIcon}/> Import</button>
						<button onClick={addTask} className={style.addButton}><div className={style.addIcon}/> Add</button>
					</div>
				</div>
				<div className={style.bodyBlock}>
					{taskList.length > 0 ? ListOfTasks() : EmptyProject()}
				</div>
			</div>
			<AboutTask/>
		</div>
	);
}