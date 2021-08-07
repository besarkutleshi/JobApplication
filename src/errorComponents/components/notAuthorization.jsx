import React from 'react'
import accessDenied from '../../images/accessDenied.png'
import { Link } from 'react-router-dom'
const NotAuthorization = () => {

    return(
        <div className="row">
            <br />
            <div className="col-sm-12 text-center">
                <img src={accessDenied} alt="" width="500px" height="500px" />
            </div>
            <div className="col-sm-12 text-center">
                <Link to={{pathname:'/'}}  className="btn btn-primary">Log In</Link>
            </div>
        </div>
    )

}

export default NotAuthorization;