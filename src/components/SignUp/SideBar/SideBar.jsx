import style from "../SignUp.module.css";
import LogoIcon from "../svg_icons/logo_icon";
import {Route, Routes} from "react-router-dom";
import Tick from "../svg_icons/tick_icon";

const SideBar = () => {
    return (
        <div className={style["side-bar"]}>
            <div className={style["side-bar__logo"]}>
                <LogoIcon/>
                <div className={style.__logo__title}>
                    LOGO
                </div>
            </div>
            <div className={style.activities_tree}>
                <Routes>
                    <Route path={"/"} element={
                        <div className={style.shape_forms}>
                            <div className={style.action}>
                                <div className={style.active_circle}><div></div></div>
                            </div>
                            <div className={style.line}></div>
                            <div className={style.action}>
                            <div className={style.circle}><div></div></div>
                            </div>
                            <div className={style.line}></div>
                            <div className={style.action}>
                            <div className={style.circle}><div></div></div>
                            </div>
                        </div>
                    }/>
                    <Route path={"/sign-up/choose-password"} element={
                        <div className={style.shape_forms}>
                            <div className={style.action}>
                                <div className={style.tick_circle}><Tick/></div>
                            </div>
                            <div className={style.line}></div>
                            <div className={style.action}>
                                <div className={style.active_circle}><div></div></div>
                            </div>
                            <div className={style.line}></div>
                            <div className={style.action}>
                                <div className={style.circle}><div></div></div>
                            </div>
                        </div>
                    }/>
                    <Route path={"/sign-up/personal-details"} element={
                        <div className={style.shape_forms}>
                            <div className={style.action}>
                                <div className={style.tick_circle}><Tick/></div>
                            </div>
                            <div className={style.line}></div>
                            <div className={style.action}>
                                <div className={style.tick_circle}><Tick/></div>
                            </div>
                            <div className={style.line}></div>
                            <div className={style.action}>
                                <div className={style.active_circle}><div></div></div>
                            </div>
                        </div>
                    }/>
                </Routes>
                <div className={style.text_information}>
                    <div className={style.block}>
                        <div className={style.action_title}>User details</div>
                        <div className={style.action_description}>Please provide your name and email</div>
                    </div>
                    <div className={style.block}>
                        <div className={style.action_title}>Choose a password</div>
                        <div className={style.action_description}>Choose a secure password</div>
                    </div>
                    <div className={style.block}>
                        <div className={style.action_title}>Personal details</div>
                        <div className={style.action_description}>Start collaborating with your team</div>
                    </div>
                </div>
            </div>
            <div className={style.sidebar_footer}>
                <div className={style.copyright}>© PCM {new Date(Date.now()).getFullYear()}</div>
                <div className={style.company_email}> help@pcm.com</div>
            </div>
        </div>
    );
}

export default SideBar;