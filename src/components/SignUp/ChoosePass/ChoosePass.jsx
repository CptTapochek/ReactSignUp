import style from "../SignUp.module.css"
import MainLogo from "../svg_icons/main_logo_icon";
import {NavLink} from "react-router-dom"

const ChoosePass = () => {
    return (
        <div className={style.main_content}>
            <div className={style.sign_up_form}>
                <div className={style.main_logo}><div><MainLogo/></div></div>
                <div className={style.form_title}>Choose a password</div><br></br>
                <div className={style.form_prompt}>Must be at least 8 characters.</div>
                <br></br>
                <form>
                    <label htmlFor={"password_form"}></label><br></br>
                    <input type={"password"} id={"password_form"} placeholder={"Choose a password"}/><br></br>

                    <label htmlFor={"confirm_pass_form"}></label><br></br>
                    <input type={"password"} id={"confirm_pass_form"} placeholder={"Confirm password"}/><br></br>

                    <NavLink to={"/sign-up/personal-details"} className={style.continue_btn}>Continue</NavLink>
                </form>
            </div>
            <div className={style.progress_bar}>
                <div></div>
                <div className={style.active_bar}></div>
                <div></div>
            </div>
        </div>
    );
}

export default ChoosePass;