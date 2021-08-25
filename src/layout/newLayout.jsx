import React, { useEffect } from 'react'
import './css/newLayout.css'
import { ic_logout } from 'react-icons-kit/md/ic_logout'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOut } from '../authentication/reduxStore/loginStore/action'
import { removeModules } from '../modules/reduxStore/action'
import { deleteEducations, deleteLanguages, deleteSkills, deleteExperiences, deleteProfile } from '../userProfile/reduxStore/action'
import { Tooltip } from 'antd'
import $ from 'jquery'
import Icon from 'react-icons-kit'
import {ic_home_filled} from 'react-icons-kit/md/ic_home_filled'
import {ic_work_twotone} from 'react-icons-kit/md/ic_work_twotone'
import {ic_power_settings_new_twotone} from 'react-icons-kit/md/ic_power_settings_new_twotone'
import {ic_settings_input_hdmi_twotone} from 'react-icons-kit/md/ic_settings_input_hdmi_twotone'
import {ic_login} from 'react-icons-kit/md/ic_login'
import {profile} from 'react-icons-kit/icomoon/profile'
import {heartO} from 'react-icons-kit/fa/heartO'
import {ic_flash_on} from 'react-icons-kit/md/ic_flash_on'
import kedsLogo from '../images/kedslogo.svg'
const NewLayout = ({ ...props }) => {


    const dispatch = useDispatch();
    const logOutStore = bindActionCreators(logOut, dispatch);
    const removeModulesStore = bindActionCreators(removeModules, dispatch);
    const deleteLanguagesStore = bindActionCreators(deleteLanguages, dispatch);
    const deleteSkillsStore = bindActionCreators(deleteSkills, dispatch);
    const deleteEducationsStore = bindActionCreators(deleteEducations, dispatch);
    const deleteExperiencesStore = bindActionCreators(deleteExperiences, dispatch);
    const deleteProfileStore = bindActionCreators(deleteProfile, dispatch);

    const modulesStore = useSelector((state) => state.module.modules);
    const user = useSelector((state) => state.login.user);

    useEffect(() => {
        const changeCss = () => {
            let next = document.querySelector("#root > div > div > div._53Ji7 > div._3uApM > a._2pGos._hsN1w")
            if (next) {
                next.style.color = "white";
            }
            let previous = document.querySelector("#root > div > div > div._53Ji7 > div._3uApM")
            if (previous) {
                previous.style.color = "black";
            }
        }
        changeCss();
    })

    const logOutUser = () => {
        logOutStore();
        removeModulesStore();
        deleteLanguagesStore();
        deleteSkillsStore();
        deleteEducationsStore();
        deleteExperiencesStore();
        deleteProfileStore();
    }


    return (
        <React.Fragment>
            <div className="sidebar active">
                <div className="logo_content">
                    <div className="logo">
                        <i className='bx bxs-bolt text-warning'></i>
                        <div className="logo_name" style={{ fontSize: "14px" }}>Application Tracking System </div>
                    </div>
                    <i onClick={() => document.querySelector(".sidebar").classList.toggle("active")} className='bx bx-menu' id="btn" />
                </div>
                <ul className="nav_list" style={{ padding: "0px" }}>
                    <li>
                        <i class='bx bx-search' ></i> <input className="links_name" type="text" placeholder="Search" />
                    </li>
                    <br />
                    <li>
                        <a href="#"><i class='bx bx-grid-alt' ></i> <span className="links_name">Dashboard</span></a>
                    </li>
                    <li>
                        <a href="#">
                            <i class='bx bx-briefcase-alt'></i>
                            <span className="links_name">Jobs</span>
                        </a>
                    </li>
                    <li>
                        <a href="#"><i class='bx bx-line-chart' ></i> <span className="links_name">Analystic</span></a>
                    </li>
                    <li>
                        <a href="#"><i class='bx bxs-user' ></i><span className="links_name">User</span></a>
                    </li>
                    <li>
                        <a href="#"><i class='bx bx-cog'></i> <span className="links_name">Role</span></a>
                    </li>
                </ul>
                <div className="profile_content">
                    <div className="profile">
                        <div className="profile_details">
                            <div className="name_job">
                                <div className="name">Besar Kutleshi</div>
                                <div className="job">Full-stack Developer</div>
                            </div>
                        </div>
                        <Tooltip title="Log Out" placement="rightTop"> <a style={{ color: "#fff" }} href="/#/" onClick={() => logOutUser()} class='bx bx-log-out' id="log_out"></a> </Tooltip>
                    </div>
                </div>
            </div>

            <div className="home_content" id="root">
                <br />
                {props.children}
            </div>


        </React.Fragment>
    )
}

export default NewLayout;

