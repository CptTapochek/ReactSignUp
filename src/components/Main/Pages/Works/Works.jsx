import React from "react";
import { useLocation } from "react-router-dom";

import style from "./Works.module.css";

import Icon from "../../../Icon";

export default function Works() {
	const { pathname } = useLocation();

	return (
		<div id={style.works}>
			<h1>LinkQuip Design</h1>
			<div className={style.tasksContainer}>
				<div className={style.tasksContainerTop}>
					<h2><Icon icon="helmet" /><p>List</p></h2>
					<div>
						<button><Icon icon="upload-cloud-dark" /><p>Import</p></button>
						<button id={style.taskContainerAdd}><Icon icon="plus" /><p>Add</p></button>
					</div>
				</div>
				<div className={style.tasksContainerMiddle}>
					<div className={style.tasksContainerMiddleLeft}>
						<button>View all</button>
						<button>Subprojects</button>
						<button>Tasks</button>
					</div>
					<div className={style.tasksContainerMiddleRight}>
						<div>
							<Icon icon="search" />
							<input type="text" placeholder="Search" />
						</div>
						<button><Icon icon="filters" /><p>Filters</p></button>
					</div>
				</div>
				<table>
					<thead>
						<tr>
							<th><span>Name</span><Icon icon="arrow-down" /></th>
							<th>Status</th>
							<th>About</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><Icon icon="file-dark" /><span>Task</span></td>
							<td>Status</td>
							<td>About</td>
						</tr>
						<tr>
							<td><Icon icon="file-dark" /><span>Task</span></td>
							<td>Status</td>
							<td>About</td>
						</tr>
						<tr>
							<td><Icon icon="file-dark" /><span>Task</span></td>
							<td>Status</td>
							<td>About</td>
						</tr>
						<tr>
							<td><Icon icon="file-dark" /><span>Task</span></td>
							<td>Status</td>
							<td>About</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={style.workDescription}>
				<h3>LinkQuip Design</h3>
				<div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus cursus id nunc senectus diam quam amet scelerisque amet. Gravida vitae risus sem massa sed in. Duis massa massa, aliquam sem felis nibh tempor nunc. Congue ipsum pharetra aliquam amet morbi ut at. Maecenas malesuada eget ultricies at malesuada massa morbi. Id suspendisse pulvinar egestas in massa tortor.
					</p>
					<p>
						Magna massa adipiscing viverra condimentum. Molestie semper eu, nam a dignissim donec hendrerit. Diam elementum proin leo eget. Nec nascetur pulvinar duis vitae consectetur ac. Id in nunc mauris diam adipiscing morbi sociis.
					</p>
					<p>
						Rhoncus, mattis dictum scelerisque sit at purus vitae. Donec augue blandit facilisis purus feugiat tincidunt massa sociis congue. Mi maecenas molestie at in. Tortor, feugiat amet, massa proin ornare. Et vulputate tincidunt pellentesque diam mi adipiscing integer turpis. Id amet tincidunt suscipit neque. Ut pellentesque duis lorem scelerisque. Donec nulla laoreet eget orci lacus, massa orci ipsum faucibus. Habitant phasellus ornare fames elementum aliquam lobortis tellus commodo. Et nibh et sit nec diam diam nulla. Commodo sed nisi, cursus in vel lorem ullamcorper.
					</p>
					<p>
						Vel mauris aliquet malesuada arcu habitant nulla rhoncus bibendum massa. Ut adipiscing molestie eget malesuada facilisi pellentesque in. Pretium a, lectus lacus eleifend volutpat vestibulum integer sed. Proin et magna mauris at felis feugiat magna. Sagittis sagittis, sit gravida morbi metus, adipiscing in ullamcorper. Enim erat vestibulum magna tortor purus urna, non accumsan. Quisque sed purus eget at porttitor laoreet. Libero, rutrum nisi, integer interdum ac.
					</p>
				</div>
			</div>
		</div>
	);
}