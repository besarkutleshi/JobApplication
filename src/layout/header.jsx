import React from 'react'
import './css/header.css'
import kedsLogo from '../images/kedslogo.svg'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOut } from '../authentication/reduxStore/loginStore/action'
import { useEffect } from 'react'
import { deleteEducations, deleteLanguages, deleteSkills, deleteExperiences, deleteProfile } from '../userProfile/reduxStore/action'

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
    })

    const logOutUser = () => {
        window.location.hash = '/';
        logOutStore();
        deleteLanguagesStore();
        deleteSkillsStore();
        deleteEducationsStore();
        deleteExperiencesStore();
        deleteProfileStore();
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
                                    <li class="nav-item active"><a href="https://www.keds-energy.com/" class="nav-link">Home</a></li>
                                    {
                                        user.token ? <div> <li class="nav-item"> <a href="/#/userHome"> My Profile </a></li>  <li class="nav-item"> <a onClick={logOutUser} className="nav-link">Log Out</a></li> </div> : <li class="nav-item"><a href="/#/login" class="nav-link">Login</a></li>
                                    }
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