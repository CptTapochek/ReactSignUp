import style from "../Login.module.css";
import BackgroundImg from "../../../assets/images/login-side-bar-background.png";
import WhiteStar from "../../../assets/icons/star-white.svg";
import YellowStar from "../../../assets/icons/star-yellow.svg";
import Arrow from "../../../assets/icons/arrow-left.svg";
import React, {useState} from "react";

const FormSideBar = () => {

	const StarRating = () => {
		const [hover, setHover] = useState(0);
		const [rating, setRating] = useState(0);
		return (
			<div>
				{[...Array.from({length: 5})].map((star, index) => {
					// eslint-disable-next-line no-param-reassign
					index += 1;
					return (
						<img
							key={index}
							src={index <= (hover || rating) ? YellowStar : WhiteStar}
							className={style.starIcon}
							onClick={() => setRating(index)}
							onMouseEnter={() => setHover(index)}
							onMouseLeave={() => setHover(rating)}
						/>
					);
				})}
			</div>
		);
	};

	return (
		<div className={style["side-bar"]}>
			<div className={style.sideBarMenu} />
			<div className={style.bottomInformation}>
				<div className={style.infoBlock}>
					<div className={style.topBlock}>
							“We’ve been using PCM to manage every new project and can’t imagine working without it.”
					</div>
					<div className={style.centerBlock}>
						<div className={style.authorName}>Andi Lane</div>
						<div className={style.infoRating}>
							<StarRating/>
						</div>
					</div>
					<div className={style.bottomBlock}>
						<div className={style.classAndCategory}>
							<div className={style.class}>Founder, Catalog</div>
							<div className={style.category}>CEO</div>
						</div>
						<div className={style.controlButtons}>
							<div className={style.prevBTN}><img src={Arrow}/></div>
							<div className={style.nextBTN}><img src={Arrow}/></div>
						</div>
					</div>
				</div>
			</div>
			<img className={style.backgroundImage} src={BackgroundImg}/>
		</div>
	);
};

export default FormSideBar;