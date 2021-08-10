import React, { useState } from 'react'
import bg from '../../images/bg_1.jpg'
import '../css/style.css'
import kedslogo from '../../images/kedslogo.svg'
import authenticationController from '../controllers/authentication.controller'
import Icon from 'react-icons-kit'
import {ic_login_outline} from 'react-icons-kit/md/ic_login_outline'
import SuccessAlert from '../../alerts/components/successAlert'
import $ from 'jquery'
import loader from '../../images/loader.gif'
const ResetPassword = ({ userName, token}) => {

    const [isLoading, setIsLoading] = useState('');
    const [username, setUsername] = useState(userName);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const resetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(password !== confirmPassword){
            $("#error").text("Password and Confirm password does not match");
            return;
        }
        let obj = {Username:username, NewPassword: password, ConfirmPassword: confirmPassword, Token:token};
        let reseted = await authenticationController.resetPassword(obj);
        if(reseted){
            SuccessAlert("Reset password successful");
            clearAttributes();
            setIsLoading(false);
            return;
        }
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
                            <h3 className="text-center lead">Reset Password</h3>
                            <br />
                            <form action="" onSubmit={resetPassword}>

                                <div className="form-group last mb-3">
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" required />
                                </div>
                                <div className="form-group last mb-3">
                                    <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
                                </div>
                                
                                <button type="submit" className="btn btn-block btn-primary"> Reset Password <Icon icon={ic_login_outline} size={20} className="float-right" /></button>
                                
                                {isLoading && <div className="text-center"> <img src={loader} width="65px" height="65px" /> </div> }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ResetPassword;