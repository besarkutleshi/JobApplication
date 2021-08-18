import React from 'react'
import './css/header.css'
import kedsLogo from '../images/kedslogo.svg'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOut } from '../authentication/reduxStore/loginStore/action'
import { useEffect } from 'react'
import { deleteEducations, deleteLanguages, deleteSkills, deleteExperiences, deleteProfile } from '../userProfile/reduxStore/action'
import Icon from 'react-icons-kit'
import {ic_home_filled} from 'react-icons-kit/md/ic_home_filled'
import {ic_work_twotone} from 'react-icons-kit/md/ic_work_twotone'
import {ic_power_settings_new_twotone} from 'react-icons-kit/md/ic_power_settings_new_twotone'
import {ic_settings_input_hdmi_twotone} from 'react-icons-kit/md/ic_settings_input_hdmi_twotone'
import {ic_login} from 'react-icons-kit/md/ic_login'
import {profile} from 'react-icons-kit/icomoon/profile'
const Header = ({ ...props }) => {


    const dispatch = useDispatch();
    const logOutStore = bindActionCreators(logOut, dispatch);
    const deleteLanguagesStore = bindActionCreators(deleteLanguages, dispatch);
    const deleteSkillsStore = bindActionCreators(deleteSkills, dispatch);
    const deleteEducationsStore = bindActionCreators(deleteEducations, dispatch);
    const deleteExperiencesStore = bindActionCreators(deleteExperiences, dispatch);
    const deleteProfileStore = bindActionCreators(deleteProfile, dispatch);
    const user = useSelector((state) => state.login.user);

    useEffect(() => {
        const changeCss = () => {
            let next = document.querySelector("#root > div > div > div._3uApM > a._2pGos._hsN1w");
            if (next) {
                next.style.color = "white";
            }
            let previous = document.querySelector("#root > div > div > div._3uApM");
            if (previous) {
                previous.style.color = "black";
            }
        }
        changeCss();
    },[])

    const logOutUser = () => {
        logOutStore();
        deleteLanguagesStore();
        deleteSkillsStore();
        deleteEducationsStore();
        deleteExperiencesStore();
        deleteProfileStore();
        window.location.hash = '/';
    }

    return (
        <div>
            <React.Fragment>
                <div class="container-fluid p-4">
                    <nav class="navbar navbar-expand-lg ftco_navbar ftco-navbar-light" id="ftco-navbar">
                        <div class="container-fluid">
                            <img src={kedsLogo} alt="" />
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="fa fa-bars"></span>
                                <span class="fa fa-bars"></span>
                                <span class="fa fa-bars"></span>
                            </button>
                            {/* <button type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                                    <i class="fa fa-bars text-white"></i>
                                    <span class="sr-only">Toggle Menu</span>
                                </button> */}
                            <div class="collapse navbar-collapse" id="ftco-nav">
                                <ul class="navbar-nav ml-auto mr-md-3">
                                    <li class="nav-item active"><a href="https://www.keds-energy.com/" class="nav-link"> <Icon size={20} icon={ic_home_filled} /> Home</a></li>
                                    { user.token && <li class="nav-item"> <a class="nav-link" href="/#/"> <Icon size={20} icon={ic_work_twotone} />  Jobs </a></li> }
                                    { user.token && <li class="nav-item"> <a class="nav-link" href="#"> <Icon size={20} icon={ic_work_twotone} /> Interesed Job </a></li> }
                                    { user.token && <li class="nav-item"> <a class="nav-link" href="#"> <Icon size={20} icon={ic_settings_input_hdmi_twotone} /> Keds Academy </a></li> }
                                    { user.token && <li class="nav-item"> <a class="nav-link" href="/#/userHome"> <Icon size={20} icon={profile} /> My Profile </a></li> }
                                    { user.token && <li class="nav-item"> <a class="nav-link" onClick={logOutUser}> <Icon size={20} icon={ic_power_settings_new_twotone} /> Log Out </a></li> }
                                    { !user.token && <li class="nav-item"> <a class="nav-link" href="/#/login"> <Icon icon={ic_login} size={20}  /> Login </a></li> }
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div id="root">
                        {props.children}
                    </div>

                    <br />
                </div>
            </React.Fragment>
        </div>
    )

}


export default Header;