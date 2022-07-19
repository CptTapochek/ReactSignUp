import React from "react";

import "./style.css";

export default class TreeMenu extends React.PureComponent {
	renderTreeNodes() {
		const tree = ["Level 0", ["Level 1", ["Level 2", "Level 2", "Level 2"]], "Level 0", ["Level 1", "Level 1", ["Level 2", "Level 2"]], "Level 0", ["Level 1", "Level 1"]];

		const renderTree = function(array) {
			return array.map((node, i) => {
				const id = Math.random();

				if(Array.isArray(array[i + 1])) {
					return (
						<li key={node + i}>
							<input type="checkbox" id={`c${id}`} />
							<label className={`tree_label ${node === "Level 0" ? "tree_label--first" : ""}`} htmlFor={`c${id}`}>{node}</label>
							<ul>
								{renderTree(array[i + 1])}
							</ul>
						</li>                   
					);
				}

				if(Array.isArray(node)) return;

				return (
					<li key={node + i}>
						<label className="tree_label">{node}</label>
					</li>
				);
			});
		};

		return renderTree(tree);
	}

	render() {

		return (
			<ul className="tree">
				{this.renderTreeNodes()}
			</ul>
		);
	}
}
