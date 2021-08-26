import React from 'react'
import './css/header.css'
import kedsLogo from '../images/kedslogo.svg'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOut } from '../authentication/reduxStore/loginStore/action'
import { deleteConfig } from '../authentication/reduxStore/loginStore/action'
import { useEffect } from 'react'
import { deleteEducations, deleteLanguages, deleteSkills, deleteExperiences, deleteProfile } from '../userProfile/reduxStore/action'
import { removeModules } from '../modules/reduxStore/action'
import Icon from 'react-icons-kit'
import {ic_home_filled} from 'react-icons-kit/md/ic_home_filled'
import {ic_work_twotone} from 'react-icons-kit/md/ic_work_twotone'
import {ic_power_settings_new_twotone} from 'react-icons-kit/md/ic_power_settings_new_twotone'
import {ic_login} from 'react-icons-kit/md/ic_login'
import {profile} from 'react-icons-kit/icomoon/profile'
import {heartO} from 'react-icons-kit/fa/heartO'
import { useState } from 'react'
import Loading from '../loader/components/loader'
import {ic_flash_on} from 'react-icons-kit/md/ic_flash_on'
import helper from '../shared/helpers/helper'
const Header = ({ ...props }) => {


    const dispatch = useDispatch();
    const logOutStore = bindActionCreators(logOut, dispatch);
    const deleteConfigStore = bindActionCreators(deleteConfig, dispatch);
    const removeModulesStore = bindActionCreators(removeModules, dispatch);
    const deleteLanguagesStore = bindActionCreators(deleteLanguages, dispatch);
    const deleteSkillsStore = bindActionCreators(deleteSkills, dispatch);
    const deleteEducationsStore = bindActionCreators(deleteEducations, dispatch);
    const deleteExperiencesStore = bindActionCreators(deleteExperiences, dispatch);
    const deleteProfileStore = bindActionCreators(deleteProfile, dispatch);
    const user = useSelector((state) => state.login.user);
    const [isLoading, setIsLoading] = useState(false);

    const modulesStore = useSelector((state) => state.module.modules);

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
        deleteConfigStore();
        removeModulesStore();
        deleteLanguagesStore();
        deleteSkillsStore();
        deleteEducationsStore();
        deleteExperiencesStore();
        deleteProfileStore();
    }

    
    if(isLoading){
        return(
            <Loading/>
        )
    }
    else{
        return (
            <div>
                <React.Fragment>
                    <div class="container-fluid">
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
                                        <li class="nav-item"> <a class="nav-link" href="/#/"> <Icon className="text-success" size={20} icon={ic_work_twotone} />  Open Job Vacancy </a></li>
                                        <li class="nav-item"> <a class="nav-link" href="/#/showInterest/2"> <Icon className="text-danger" size={20} icon={heartO} /> Show your interest </a></li>
                                        <li class="nav-item"> <a class="nav-link" href="/#/kedsAcademy/3"> <Icon  className="text-warning" size={20} icon={ic_flash_on} /> KEDS Academy </a></li>
                                        {
                                            helper.validUsername(user.username) &&
                                            modulesStore.map((element,key) => {
                                                return(
                                                    <li class="nav-item"> 
                                                        {
                                                            element.menus.filter(filter => { return filter.isShown === 1 }).map((menu, menuKey) => {
                                                                return(
                                                                    <a class="nav-link" href={`/#${menu.url}`}> <Icon icon={profile} className="text-info" /> {menu.menuName} </a>
                                                                )
                                                            })
                                                        }
                                                    </li>
                                                )
                                            })
                                        }
                                        {
                                            user && user.token && helper.validUsername(user.username) === false && <li class="nav-item"> <a class="nav-link" href="/#/openJobs"> <Icon className="text-info" icon={ic_login} size={20}  /> ATS </a></li> 
                                        }
                                        { user.token && <li class="nav-item"> <a href="/#/" class="nav-link" onClick={() => logOutUser()}> <Icon className="text-black-50" size={20} icon={ic_power_settings_new_twotone} /> Log Out </a></li> }
                                        { !user.token && <li class="nav-item"> <a class="nav-link" href="/#/login"> <Icon className="text-info" icon={ic_login} size={20}  /> Login </a></li> }
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
}


export default Header;