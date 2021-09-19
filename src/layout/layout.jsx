import React, { useEffect } from 'react'
import $ from 'jquery'
import Icon from 'react-icons-kit'
import { ic_work_outline_twotone } from 'react-icons-kit/md/ic_work_outline_twotone'
import albanianFlag from '../images/albanian.png'
import englandFlag from '../images/englad.png'
import { ic_logout } from 'react-icons-kit/md/ic_logout'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOut } from '../authentication/reduxStore/loginStore/action'
import { deleteConfig } from '../authentication/reduxStore/loginStore/action'
import { removeModules } from '../modules/reduxStore/action'
import { deleteEducations, deleteLanguages, deleteSkills, deleteExperiences, deleteProfile } from '../userProfile/reduxStore/action'
import 'boxicons'
const Layout = ({ ...props }) => {

    const dispatch = useDispatch();
    const logOutStore = bindActionCreators(logOut,dispatch);
    const deleteConfigStore = bindActionCreators(deleteConfig,dispatch);
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
            if(next){
                next.style.color = "white";
            }
            let previous = document.querySelector("#root > div > div > div._53Ji7 > div._3uApM")
            if(previous){
                previous.style.color = "black";
            }
        }
        changeCss();
    })

    const logOutUser = () => {
        window.location.hash = '/';
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

    return (
        <div>
            <React.Fragment>
                <div class="wrapper d-flex align-items-stretch">
                    <nav id="sidebar">
                        <p className="pt-3" style={{ color: "white", fontSize:"20px",marginLeft:"60px" }} id="hr" > <i class='bx bxs-bolt text-warning' ></i> KEDS - ATS </p>
                        <div class="p-4">
                            <ul class="list-unstyled components mb-5" style={{ marginTop: "20px" }}>
                                <li>
                                    <a href="/#/"><i style={{fontSize:"18px"}} class='bx bx-home-alt'></i> <span className="ml-3">Home</span></a>
                                </li>
                                {
                                    modulesStore.map((element,key) => {
                                        return(
                                            <li key={key}>
                                                <a id="" href={`#${element.moduleName}`} data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                                                <i class={`${element.icon}`} style={{fontSize:"18px"}} ></i> <span className="ml-3">{element.moduleName}</span></a>
                                                 
                                                <ul class="collapse list-unstyled" id={`${element.moduleName}`}>
                                                 {
                                                     element.menus.filter(element => { return element.isShown === 1}).map((menu, keyMenu) => {
                                                        return(
                                                            <li key={keyMenu}>
                                                                 <a id="" href={`/#${menu.url}`}> <i class={`${menu.icon}`} style={{fontSize:"18px"}} ></i> <span className="ml-3">{menu.menuName}</span></a>
                                                            </li>
                                                        )
                                                     })
                                                 }
                                                 </ul>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </nav>

                    <div id="content" style={{ backgroundColor: '#f4f6f9' }}>
                        <nav id="navbar" class="navbar navbar-expand-lg navbar-light">
                            <div class="container-fluid">
                                <button onClick={() => $('#sidebar').toggleClass('active')} type="button" id="sidebarCollapse" class="btn">
                                    <i class="fa fa-bars text-black"></i>
                                    <span class="sr-only">Toggle Menu</span>
                                </button>

                                <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                    <i class="fa fa-bars"></i>
                                </button>

                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="nav navbar-nav ml-auto">
                                        <li className="nav-item dropdown">
                                            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown"> <span className="mr-2"> Welcome </span></a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                {/* <a id="" href="/myProfile" class="dropdown-item"><i class="fa fa-user" aria-hidden="true"></i> <span id="profile" className="ml-2"> My Profile</span></a>
                                                <div className="dropdown-divider"></div>
                                                <a id="" className="dropdown-item"><img src={albanianFlag} width="25px" height="20px" /> <span id="albania" className="ml-2"> Albania</span></a>
                                                <a id="" className="dropdown-item"><img src={englandFlag} width="25px" height="20px" /><span id="english" className="ml-2"> English</span></a>
                                                <hr /> */}
                                                <a onClick={logOutUser} className="dropdown-item"> <Icon icon={ic_logout} size={20} className="ml-1" /> <span id="logoutbro" className="ml-2"> Log Out</span></a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>


                            </div>
                        </nav>
                        <div id="root">
                            {props.children}
                        </div>
                        <footer class="footer">
                            <div className="float-left">
                                <p className="text-muted">Application Tracking System</p>
                            </div>
                        </footer>
                    </div>
                </div>
            </React.Fragment>
        </div>
    )
}

export default Layout