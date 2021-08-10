import React from 'react'
import Icon from 'react-icons-kit'
import {ic_login_outline} from 'react-icons-kit/md/ic_login_outline'

import kedslogo from '../../images/kedslogo.svg'
const ForgotPasswordEmail = ({ message }) => {


    return (
        <div className="container-fluid">
            <br /><br />
            <div className="row">
                <div className="col-sm-12 text-center mb-4">
                    <img src={kedslogo} alt="" />
                </div>
                <div className="col-sm-12 mb-3">
                    <h6 className="text-center text-success">
                        We have sent you an email to your email address for reseting your password!
                    </h6>
                </div>
                <br />
                <div className="col-sm-12 text-center">
                    <a href="/#/login" className="btn btn-primary"> <Icon icon={ic_login_outline} /> Login</a>
                </div>
            </div>
        </div>
    )


}

export default ForgotPasswordEmail;