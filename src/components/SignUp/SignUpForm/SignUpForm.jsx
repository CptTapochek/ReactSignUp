import style from "../SignUp.module.css"
import MainLogo from "../svg_icons/main_logo_icon";
import {NavLink} from "react-router-dom"

const SignUpForm = () => {
    return (
        <div className={style.main_content}>
            <div className={style.sign_up_form}>
                <div className={style.main_logo}><div><MainLogo/></div></div>
                <div className={style.form_title}>Sign Up</div><br></br>
                <div className={style.form_prompt}>Start your 30-day free trial.</div><br></br>
                <form>
                    <label htmlFor={"first_name_form"}>First Name*</label><br></br>
                    <input type={"text"} id={"first_name_form"} placeholder={"Enter your first name"}/><br></br>

                    <label htmlFor={"last_name_form"}>Last Name*</label><br></br>
                    <input type={"text"} id={"last_name_form"} placeholder={"Enter your last name"}/><br></br>

                    <label htmlFor={"user_name_form"}>User Name*</label><br></br>
                    <input type={"text"} id={"user_name_form"} placeholder={"Enter your user name"}/><br></br>

                    <NavLink to={"/sign-up/choose-password"} className={style.continue_btn}>Continue</NavLink>
                </form>
                <div className={style.have_an_account}>
                    Already have an account? <NavLink to={"/Login"}>Log in</NavLink>
                </div>
            </div>
            <div className={style.progress_bar}>
                <div className={style.active_bar}></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default SignUpForm;