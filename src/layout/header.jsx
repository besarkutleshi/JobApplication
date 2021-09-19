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
import { ic_home_filled } from 'react-icons-kit/md/ic_home_filled'
import { ic_work_twotone } from 'react-icons-kit/md/ic_work_twotone'
import { ic_power_settings_new_twotone } from 'react-icons-kit/md/ic_power_settings_new_twotone'
import { ic_login } from 'react-icons-kit/md/ic_login'
import { profile } from 'react-icons-kit/icomoon/profile'
import { heartO } from 'react-icons-kit/fa/heartO'
import { useState } from 'react'
import Loading from '../loader/components/loader'
import { ic_flash_on } from 'react-icons-kit/md/ic_flash_on'
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
    }, [])

    const logOutUser = () => {
        logOutStore();
        deleteConfigStore();
        removeModulesStore();
        deleteLanguagesStore();
        deleteSkillsStore();
        deleteEducationsStore();
        deleteExperiencesStore();
        deleteProfileStore();
        localStorage.clear();
    }


    if (isLoading) {
        return (
            <Loading />
        )
    }
    else {
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
                                        <li class="nav-item active"><a href="https://www.keds-energy.com/" class="nav-link nav-link-custom"> <Icon size={20} icon={ic_home_filled} /> Home</a></li>
                                        <li class="nav-item"> <a class="nav-link nav-link-custom" href="/#/"> <Icon className="text-success" size={20} icon={ic_work_twotone} />  Open Job Vacancy </a></li>
                                        <li class="nav-item"> <a class="nav-link nav-link-custom" href="/#/showInterest/2"> <Icon className="text-danger" size={20} icon={heartO} /> Show your interest </a></li>
                                        <li class="nav-item"> <a class="nav-link nav-link-custom" href="/#/kedsAcademy/3"> <Icon className="text-warning" size={20} icon={ic_flash_on} /> KEDS Academy </a></li>
                                        {
                                            helper.validUsername(user.username) &&
                                            modulesStore.map((element, key) => {
                                                return (
                                                    <li class="nav-item">
                                                        {
                                                            element.menus.filter(filter => { return filter.isShown === 1 }).map((menu, menuKey) => {
                                                                return (
                                                                    <a class="nav-link nav-link-custom" href={`/#${menu.url}`}> <Icon icon={profile} className="text-info" /> {menu.menuName} </a>
                                                                )
                                                            })
                                                        }
                                                    </li>
                                                )
                                            })
                                        }
                                        {
                                            user && user.token && helper.validUsername(user.username) === false && <li class="nav-item"> <a class="nav-link nav-link-custom" href="/#/openJobs"> <Icon className="text-info" icon={ic_login} size={20} /> ATS </a></li>
                                        }
                                        {user.token && <li class="nav-item"> <a href="/#/" class="nav-link nav-link-custom" onClick={() => logOutUser()}> <Icon className="text-black-50" size={20} icon={ic_power_settings_new_twotone} /> Log Out </a></li>}
                                        {!user.token && <li class="nav-item"> <a class="nav-link nav-link-custom" href="/#/login"> <Icon className="text-info" icon={ic_login} size={20} /> Login </a></li>}
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div id="root">
                            {props.children}
                        </div>
                        <br />
                    </div>
                    <footer class="bg-white card" style={{marginTop:"100px"}}>
                        <div class="container py-5">
                            <div class="row py-4">
                                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0"><img src="img/logo.png" alt="" width="180" class="mb-3" />
                                    <p class="font-italic text-muted">Our investments are enlightening Kosovo. We give light to every home, school, community and business. We are lightening the whole country.</p>
                                    <ul class="list-inline mt-4">
                                        <li class="list-inline-item"><a href="#" target="_blank" title="twitter"><i class="fa fa-twitter"></i></a></li>
                                        <li class="list-inline-item"><a href="#" target="_blank" title="facebook"><i class="fa fa-facebook"></i></a></li>
                                        <li class="list-inline-item"><a href="#" target="_blank" title="instagram"><i class="fa fa-instagram"></i></a></li>
                                        <li class="list-inline-item"><a href="#" target="_blank" title="pinterest"><i class="fa fa-pinterest"></i></a></li>
                                        <li class="list-inline-item"><a href="#" target="_blank" title="vimeo"><i class="fa fa-vimeo"></i></a></li>
                                    </ul>
                                </div>
                                <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                                    <h6 class="text-uppercase font-weight-bold mb-4">About us</h6>
                                    <ul class="list-unstyled mb-0">
                                        <li class="mb-2"><a href="#" class="text-muted">KEDS Profile</a></li>
                                        <li class="mb-2"><a href="#" class="text-muted">Sustainability and Commitments</a></li>
                                        <li class="mb-2"><a href="#" class="text-muted">Career</a></li>
                                        <li class="mb-2"><a href="#" class="text-muted">Training Center</a></li>
                                    </ul>
                                </div>
                                <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
                                    <h6 class="text-uppercase font-weight-bold mb-4">Links</h6>
                                    <ul class="list-unstyled mb-0">
                                        <li class="mb-2"><a href="#" class="text-muted">Login</a></li>
                                        <li class="mb-2"><a href="#" class="text-muted">Register</a></li>
                                    </ul>
                                </div>
                                <div class="col-lg-4 col-md-6 mb-lg-0">
                                    <h6 class="text-uppercase font-weight-bold mb-4">Call Center - Available 24 hours</h6>
                                    <p class="text-muted mb-4">The free of charge telephone number 0800 791 00 is available for customers 24 hours per day, where they can get information related to KEDS services</p>
                                    <div class="p-1 rounded border">
                                        <div class="input-group">
                                            <input type="email" placeholder="Enter your feedback" aria-describedby="button-addon1" class="form-control border-0 shadow-0" />
                                            <div class="input-group-append">
                                                <button id="button-addon1" type="submit" class="btn btn-link"><i class="fa fa-paper-plane"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-light py-4">
                            <div class="container text-center">
                                <p class="text-muted mb-0 py-2">© 2021 Kosovo Electricity Distribution Company. All rights reserved.</p>
                            </div>
                        </div>
                    </footer>
                </React.Fragment>
            </div>
        )
    }
}


export default Header;