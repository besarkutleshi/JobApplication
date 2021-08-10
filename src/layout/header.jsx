import React from 'react'
import './css/header.css'
import kedsLogo from '../images/kedslogo.svg'
const Header = ({...props}) => {

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
                                        <li class="nav-item"><a href="/#/login" class="nav-link">Login</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <div id="root">
                            {props.children}
                        </div>
                    </div>
            </React.Fragment>
        </div>
    )

}


export default Header;