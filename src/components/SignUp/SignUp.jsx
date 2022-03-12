import style from "./SignUp.module.css";
import SideBar from "./SideBar/SideBar";
import SignUpForm from "./SignUpForm/SignUpForm";
import ChoosePass from "./ChoosePass/ChoosePass";
import SuccessPopUp from "./SuccessPopUp/SuccessPopUp"
import SmallScreenSuccess from "./SuccessPopUp/SignUpSmallScreen"
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const SignUp = () => {
    return (
        <BrowserRouter>
            <SuccessPopUp/>
            <SmallScreenSuccess/>
            <div className={style["sign-up"]}>
                <SideBar/>
                <Routes>
                    <Route path={"/"} element={<SignUpForm/>}/>
                    <Route path={"/sign-up/choose-password"} element={<ChoosePass/>}/>
                    <Route path={"/sign-up/personal-details"} element={<PersonalDetails/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default SignUp;