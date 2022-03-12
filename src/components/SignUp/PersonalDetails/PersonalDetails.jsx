import style from "../SignUp.module.css"
import React, { useState } from "react";
import {NavLink} from "react-router-dom"
import CameraIcon from "../svg_icons/camera_icon";
import MainLogo from "../svg_icons/main_logo_icon";
import DatePicker from "react-modern-calendar-datepicker";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

let today = new Date().toISOString().substr(0, 10);
let current_theme_color = "#36A0C9";

const PersonalDetails = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    let InputDateElement = React.useRef();

    const months = {
        Jan: 1, Feb: 2, Mar: 3, APR: 4, May: 5, Jun: 6,
        Jul: 7, Aug: 8, Sept: 9, Oct: 10, Nov: 11, Dec: 12
    }

    function DateFormat(){
        let selectedMonth;
        for (let i = 0; i < 12; i++){
            let month_val = Object.keys(months)[i];
            let month_key = Object.values(months)[i];
            if (selectedDay.month == month_key){
                selectedMonth = month_val;
            }
        }
        return `${selectedMonth} ${selectedDay.day}, ${selectedDay.year}`;
    }

    const renderBirthDateInput = ({ ref }) => (
        <input
            readOnly
            ref={ref}
            placeholder="DD/MM/YYYY"
            value={selectedDay ? DateFormat() : ''}
            style={{
                paddingLeft: '40px'
            }}
            className={style.birth_date_input}
        />
    )

    let new_avatar = React.createRef();
    let InputPhoto = () => {
        console.log(new_avatar.current.value);
    }

    let complete = React.createRef();
    let CompleteSignUp = () => {
        document.getElementById("PopUpSignUpSuccess").style.display = "flex";
        document.getElementById("SignUpProgressBar").style.display = "none";
    }
    let CpltSignUpSmallScreen = () => {
        document.getElementById("SignUpSuccessSmallScreen").style.display = "flex";
        document.getElementById("SignUpProgressBar").style.display = "none";
        document.getElementById("SignUpForm").style.display = "none";
    }

    return (
        <div className={style.main_content}>
            <div className={style.sign_up_form_detail}>
                <form id={"SignUpForm"}>
                    <div className={style.main_logo}><div><MainLogo/></div></div>
                    <div className={style.form_title}>Personal Details</div><br></br>
                    <div className={style.form_prompt}>Avatar, birthdate, contact details.</div>
                    <div className={style.form_block}>
                        <div className={style.avatar_input}>
                            <div>Profile avatar</div><br></br>
                            <label className={style.avatar_upload}>
                                <input type={"file"} onInput={InputPhoto} ref={new_avatar}/>
                                <div className={style.default_avatar}><CameraIcon/></div>
                            </label>
                        </div>
                        <div className={style.right_inputs}>
                            <div className={style.birth_date_block}>
                                <label htmlFor={"birth_date_form"}>Birh Date</label>
                                <div className={style.calendar_icon}></div>
                                <div className={style.calendar_popup}>
                                    <DatePicker
                                        value={selectedDay}
                                        onChange={setSelectedDay}
                                        renderInput={renderBirthDateInput}
                                        inputClassName="birth_date_input"
                                        colorPrimary={current_theme_color}
                                        colorPrimaryLight="rgba(75, 207, 250, 0.4)"
                                        shouldHighlightWeekends
                                    />
                                </div>
                            </div><br></br>
                            <br></br>
                            <label htmlFor={"email_form"}>E-mail address</label><br></br>
                            <input type={"email"} placeholder={"e.g. johndoe@fastmail.com"} className={style.email_input} autoComplete={"off"}/><br></br>
                        </div>
                    </div>

                    <label htmlFor={"location_form"}><div className={style.map_pin_icon}></div>Location</label><br></br>
                    <input type={"text"} id={"location_form"} placeholder={"Enter location"} className={style.location_input}/><br></br>

                    <label htmlFor={"phone_form"}>Phone number</label><br></br>
                    <input type={"tel"} id={"phone_form"} placeholder={"+1 (555) 000-0000"}/><br></br>

                    <div className={style.terms_conditions_block}>
                        <input className={style.condition_checkbox} type={"checkbox"} id={"terms_condition"}/>
                        <label className={style.terms_conditions}>You agree to our friendly
                            <NavLink to={"/sign-up/terms-conditions"}>terms and conditions & privacy policy.</NavLink>
                        </label>
                    </div><br></br>

                    <NavLink to={"/sign-up/personal-details"} className={style.complet_btn} ref={complete} onClick={CompleteSignUp}>Complete</NavLink>
                    <NavLink to={"/sign-up/personal-details"} className={style.continue_btn_small_screen} onClick={CpltSignUpSmallScreen}>Complete</NavLink>
                </form>
            </div>
            <div className={style.progress_bar} id={"SignUpProgressBar"}>
                <div></div>
                <div></div>
                <div className={style.active_bar}></div>
            </div>
        </div>
    );
}

export default PersonalDetails;