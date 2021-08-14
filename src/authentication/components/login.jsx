import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import bg from '../../images/bg_1.jpg'
import '../css/style.css'
import {Checkbox} from 'antd'
import kedslogo from '../../images/kedslogo.svg'
import authenticationController from '../controllers/authentication.controller'
import $ from 'jquery'
import { bindActionCreators } from 'redux';
import { login } from '../reduxStore/loginStore/action'
import { addModules } from '../../modules/reduxStore/action'
import loader from '../../images/loader.gif'
import Icon from 'react-icons-kit'
import {ic_login_outline} from 'react-icons-kit/md/ic_login_outline'
import helper from '../../helpers/helper'


const Login = ({ urlRoute = null ,parameter = null }) => {

    const dispatch = useDispatch();
    const addLogin = bindActionCreators(login,dispatch);
    const addModulesStore = bindActionCreators(addModules,dispatch);
    
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('besar.kutleshi@keds-energy.com');
    const [password, setPassword] = useState('besark');


    const loginUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        let obj = {Username:username, Password:password};
        let login = await authenticationController.login(obj);
        setIsLoading(false);
        if(login.username){
            addLogin(login);
            addModulesStore(login.modules);
            if(helper.validUsername(username)){
                if(urlRoute != null && parameter != null){
                    window.location.hash = `/${urlRoute}/${parameter}`;
                    return;
                }
                window.location.hash = "/";
                return;
            }
            window.location.hash = "/openJobs";
        }
        else{
            $("#error").text(login);
        }
    }

    return (
        <div className="d-lg-flex half">
            <div className="bg order-1 order-md-2" style={{backgroundImage: `url(${bg})`}}></div>
            <div className="contents order-2 order-md-1">

                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7">
                            <div className="text-center">
                            <img src={kedslogo} alt="" />
                            </div>
                            <br />
                            <p className="text-danger text-center" id="error" ></p>
                            <br />
                            <h3 className="text-center lead">Login</h3>
                            <br />
                            <form action="" onSubmit={loginUser}>
                                <div className="form-group first">
                                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                                </div>
                                <div className="form-group last mb-3">
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                                </div>
                                

                                <div className="d-flex mb-5 align-items-center">
                                    <Checkbox>Remeber Me</Checkbox> 
                                    <span className="ml-auto"><a href="/#/forgotPassword" className="forgot-pass">Forgot Password</a></span>
                                </div>
                                <button type="submit" className="btn btn-block btn-primary mb-1"> Log In <Icon icon={ic_login_outline} size={20} className="float-right" /></button>
                                <a href="/#/registerUser" style={{color:"white"}} className="btn btn-block btn-primary"> Register <Icon icon={ic_login_outline} size={20} className="float-right" /></a>
                                {isLoading && <div className="text-center"> <img src={loader} width="65px" height="65px" /> </div> }
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )

}

export default Login;