import React, { useState } from 'react'
import bg from '../../images/bg_1.jpg'
import '../css/style.css'
import kedslogo from '../../images/kedslogo.svg'
import authenticationController from '../controllers/authentication.controller'
import $ from 'jquery'
import loader from '../../images/loader.gif'
import Icon from 'react-icons-kit'
import {ic_login_outline} from 'react-icons-kit/md/ic_login_outline'
import helper from '../../shared/helpers/helper'
import securityController from '../controllers/security.controller'
const RegisterUser = () => {

    const [isLoading, setIsLoading] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(helper.validUsername(username)){
            let obj = {Username : username, Password: securityController.encrypt(password), ConfirmPassword : securityController.encrypt(confirmPassword)};
            if(password !== confirmPassword){
                $("#error").text("Password and Confirm password does not match");
                return;
            }
            let registered = await authenticationController.registerUser(obj);
            if(registered){
                clearAttributes();
                window.location.hash = "/emailConfirmation"
            }
            setIsLoading(false);
        }
        $("#error").text("Username is not valid");
        setIsLoading(false);
    }

    const clearAttributes = () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    }

    return(
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
                            <h3 className="text-center lead">Register</h3>
                            <br />
                            <form action="" onSubmit={registerUser}>

                                <div className="form-group first">
                                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" required />
                                </div>
                                <div className="form-group last mb-3">
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                                </div>
                                <div className="form-group last mb-3">
                                    <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
                                </div>
                                
                                <button type="submit" className="btn btn-block btn-primary"> Register <Icon icon={ic_login_outline} size={20} className="float-right" /></button>
                                
                                {isLoading && <div className="text-center"> <img src={loader} width="65px" height="65px" /> </div> }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default RegisterUser;