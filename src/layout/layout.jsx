import React, { Component } from 'react'
import $ from 'jquery'
import Icon from 'react-icons-kit'
import {ic_work_outline_twotone} from 'react-icons-kit/md/ic_work_outline_twotone'
export class Layout extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    <div class="wrapper d-flex align-items-stretch">
                        <nav id="sidebar">
                            <h6 className="pl-4 pt-4 lead" style={{color:"white"}} id="hr" > KEDS & Career </h6>
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

                        <div id="content" style={{backgroundColor : ''}}>
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
                                            <li className="p-2">
                                                <h5 className="lead" style={{color:'white'}}>Welcome</h5>
                                            </li>
                                            <li class="nav-item dropdown p-2">
                                                <h4 className="lead" style={{color:'white'}}>Besar Kutleshi</h4>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                            <div id="root">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </div>
        )
    }
}

export default Layout