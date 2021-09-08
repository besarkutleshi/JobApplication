import React, { useState } from 'react'
import bg from '../../images/bg_1.jpg'
import '../css/style.css'
import kedslogo from '../../images/kedslogo.svg'
import authenticationController from '../controllers/authentication.controller'
import loader from '../../images/loader.gif'
import Icon from 'react-icons-kit'
import {ic_login_outline} from 'react-icons-kit/md/ic_login_outline'
import $ from 'jquery'
import helper from '../../shared/helpers/helper'
const ForgotPassword = () => {

    const [isLoading, setIsLoading] = useState('');
    const [username, setUsername] = useState('');

    const forgotPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(helper.validUsername(username)){
            let mailed = await authenticationController.forgotPassword(username);
            if(mailed){
                setIsLoading(false);
                window.location.hash = "/forgotPasswordConfirmation"
            }
            setIsLoading(false);
        }
        $("#error").text("Username is not valid");
        setIsLoading(false);
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
                            <h3 className="text-center lead">Forgot Password</h3>
                            <br />
                            <form action="" onSubmit={forgotPassword}>

                                <div className="form-group first">
                                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" required />
                                </div>
                                
                                <button type="submit" className="btn btn-block btn-primary"> Send Recover Link <Icon icon={ic_login_outline} size={20} className="float-right" /></button>
                                
                                {isLoading && <div className="text-center"> <img src={loader} width="65px" height="65px" /> </div> }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ForgotPassword;