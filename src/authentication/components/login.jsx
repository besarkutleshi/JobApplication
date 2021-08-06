import React, { useState, useEffect } from 'react'
// import '../css/login.css'
import bg from '../../images/bg_1.jpg'
import '../css/style.css'
import {Checkbox} from 'antd'
import kedslogo from '../../images/kedslogo.svg'
const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const login = async (e) => {

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
                            <br />
                            <h3 className="text-center lead">Login</h3>
                            <br />
                            <form action="#" method="post">
                                <div className="form-group first">
                                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                                </div>
                                <div className="form-group last mb-3">
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                </div>

                                <div className="d-flex mb-5 align-items-center">
                                    <Checkbox>Remeber Me</Checkbox> 
                                    <span className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></span>
                                </div>

                                <input type="submit" value="Log In" className="btn btn-block btn-primary" />

                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )

}

export default Login;