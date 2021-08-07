import React, { Component } from 'react'
import $ from 'jquery'
import Icon from 'react-icons-kit'
import { ic_work_outline_twotone } from 'react-icons-kit/md/ic_work_outline_twotone'
import albanianFlag from '../images/albanian.png'
import englandFlag from '../images/englad.png'
import { ic_logout } from 'react-icons-kit/md/ic_logout'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOut } from '../authentication/reduxStore/loginStore/action'
const Layout = ({ ...props }) => {

    const dispatch = useDispatch();
    const logOutStore = bindActionCreators(logOut,dispatch);

    const logOutUser = () => {
        logOutStore();
        window.location.hash = '/login';
    }

    return (
        <div>
            <React.Fragment>
                <div class="wrapper d-flex align-items-stretch">
                    <nav id="sidebar">
                        <h6 className="pl-4 pt-4 lead" style={{ color: "white" }} id="hr" > KEDS & Career </h6>
                        <div class="p-4">
                            <ul class="list-unstyled components mb-5" style={{ marginTop: "20px" }}>
                                <li class="">
                                    <a href="#"><i class="far fa-address-card"></i> <span id="saleNav">Home </span></a>
                                </li>
                                <li>
                                    <a href="#"><i class="far fa-address-book"></i>
                                        <span id="purchases"> Applications </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"><i class="far fa-address-book"></i>
                                        <span id="purchases"> Analystics </span>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <Icon icon={ic_work_outline_twotone} />
                                        <span> Open Jobs </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#"><i class="far fa-address-book"></i>
                                        <span id="purchases"> Administration </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div id="content" style={{ backgroundColor: '' }}>
                        <nav id="navbar" class="navbar navbar-expand-lg navbar-light">
                            <div class="container-fluid">

                                <button onClick={() => $('#sidebar').toggleClass('active')} type="button" id="sidebarCollapse" class="btn">
                                    <i class="fa fa-bars text-white"></i>
                                    <span class="sr-only">Toggle Menu</span>
                                </button>

                                <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                    <i class="fa fa-bars"></i>
                                </button>

                                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul class="nav navbar-nav ml-auto">
                                        <li id="logout" className="nav-item dropdown">
                                            <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown"> <span className="mr-2" style={{ fontSize: '20px' }}> <i id="welcome"> Welcome</i> <i></i> </span> </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a id="" href="/myProfile" class="dropdown-item"><i class="fa fa-user" aria-hidden="true"></i> <span id="profile" className="ml-2"> My Profile</span></a>
                                                <div className="dropdown-divider"></div>
                                                <a id="" className="dropdown-item"><img src={albanianFlag} width="25px" height="20px" /> <span id="albania" className="ml-2"> Albania</span></a>
                                                <a id="" className="dropdown-item"><img src={englandFlag} width="25px" height="20px" /><span id="english" className="ml-2"> English</span></a>
                                                <hr />
                                                <a id="" onClick={logOutUser} className="dropdown-item" href="/"> <Icon icon={ic_logout} size={20} className="ml-1" /> <span id="logoutbro" className="ml-2"> Log Out</span></a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>


                            </div>
                        </nav>
                        <div id="root">
                            {props.children}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </div>
    )
}

export default Layout