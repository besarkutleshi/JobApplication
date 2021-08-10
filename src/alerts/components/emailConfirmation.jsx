import React from 'react'
import Icon from 'react-icons-kit'
import {ic_login_outline} from 'react-icons-kit/md/ic_login_outline'

import kedslogo from '../../images/kedslogo.svg'
const EmailConfirmation = ({ message }) => {


    return (
        <div className="container-fluid">
            <br /><br />
            <div className="row">
                <div className="col-sm-12 text-center mb-4">
                    <img src={kedslogo} alt="" />
                </div>
                <div className="col-sm-12 mb-3">
                    <h6 className="text-center text-success">
                        Successful registration, we have sent you an email to your address for confirmation, please confirm your account.
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

export default EmailConfirmation;